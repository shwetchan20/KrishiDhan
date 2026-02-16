import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from './firebase';
import { ServiceErrorCode, fail, ok, toErrorDetails } from './errors';
import { validateRequestPayload } from './schema';

const REQUESTS_COLLECTION = 'requests';
const LISTINGS_COLLECTION = 'listings';
const AVAILABILITY_COLLECTION = 'availability';
const FINAL_STATUSES = new Set(['rejected', 'cancelled', 'completed']);

const parseDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

const datesOverlap = (aStart, aEnd, bStart, bEnd) => aStart <= bEnd && bStart <= aEnd;

export async function createRequest(data) {
    const validated = validateRequestPayload(data);
    if (!validated.ok) return validated;

    try {
        const payload = validated.data;
        const listingRef = doc(db, LISTINGS_COLLECTION, payload.listingId);
        const listingSnap = await getDoc(listingRef);

        if (!listingSnap.exists()) {
            return fail(ServiceErrorCode.NOT_FOUND, 'Listing not found');
        }

        const listing = listingSnap.data();
        if (!listing.isAvailable) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'Listing is not available');
        }

        if (payload.ownerId === payload.renterId) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'Owner cannot create request on own listing');
        }

        const expectedRequestType = listing.listingType === 'rent' ? 'rent' : 'buy';
        if (payload.requestType !== expectedRequestType) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'Request type must match listing type');
        }

        const existingSnapshot = await getDocs(query(collection(db, REQUESTS_COLLECTION), where('listingId', '==', payload.listingId)));
        const existingRequests = existingSnapshot.docs.map((snap) => snap.data());

        if (payload.requestType === 'rent') {
            const start = parseDate(payload.startDate);
            const end = parseDate(payload.endDate);
            if (!start || !end || start > end) {
                return fail(ServiceErrorCode.VALIDATION_ERROR, 'Invalid rent dates');
            }

            const availabilitySnapshot = await getDocs(query(
                collection(db, AVAILABILITY_COLLECTION),
                where('equipmentId', '==', payload.listingId),
                where('isBlocked', '==', true)
            ));
            const blockedRanges = availabilitySnapshot.docs.map((snap) => snap.data());
            const conflictingBlocked = blockedRanges.some((entry) => {
                const blockedStart = parseDate(entry.startDate);
                const blockedEnd = parseDate(entry.endDate);
                if (!blockedStart || !blockedEnd) return false;
                return datesOverlap(start, end, blockedStart, blockedEnd);
            });
            if (conflictingBlocked) {
                return fail(ServiceErrorCode.VALIDATION_ERROR, 'Already booked on selected dates');
            }

            const conflictingApproved = existingRequests.some((request) => {
                if (request.requestType !== 'rent') return false;
                if (request.status !== 'approved') return false;
                const reqStart = parseDate(request.startDate);
                const reqEnd = parseDate(request.endDate);
                if (!reqStart || !reqEnd) return false;
                return datesOverlap(start, end, reqStart, reqEnd);
            });

            if (conflictingApproved) {
                return fail(ServiceErrorCode.VALIDATION_ERROR, 'Selected dates are already booked');
            }
        }

        if (payload.requestType === 'buy') {
            const hasActiveBuy = existingRequests.some((request) =>
                request.requestType === 'buy' && !FINAL_STATUSES.has(request.status)
            );
            if (hasActiveBuy) {
                return fail(ServiceErrorCode.VALIDATION_ERROR, 'Buy request is already in progress for this listing');
            }
        }

        const requestRef = payload.id
            ? doc(db, REQUESTS_COLLECTION, payload.id)
            : doc(collection(db, REQUESTS_COLLECTION));

        const request = {
            id: requestRef.id,
            listingId: payload.listingId,
            ownerId: payload.ownerId,
            renterId: payload.renterId,
            requestType: payload.requestType,
            bookingType: payload.bookingType,
            startDate: payload.startDate,
            endDate: payload.endDate,
            hoursBooked: payload.hoursBooked,
            acresBooked: payload.acresBooked,
            daysBooked: payload.daysBooked,
            baseCost: payload.baseCost,
            travelCost: payload.travelCost,
            platformFee: payload.platformFee,
            totalCost: payload.totalCost,
            farmerMessage: payload.farmerMessage,
            ownerResponse: payload.ownerResponse,
            paymentStatus: payload.paymentStatus,
            message: payload.message,
            status: payload.status,
            createdAt: serverTimestamp(),
        };

        await setDoc(requestRef, request, { merge: true });
        return ok({ id: requestRef.id, ...request });
    } catch (error) {
        return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to create request', toErrorDetails(error));
    }
}

export async function getRequests(filters = {}) {
    try {
        const requestsRef = collection(db, REQUESTS_COLLECTION);

        let docs = [];

        if (filters.userId) {
            const renterSnapshot = await getDocs(query(requestsRef, where('renterId', '==', filters.userId)));
            const ownerSnapshot = await getDocs(query(requestsRef, where('ownerId', '==', filters.userId)));

            const merged = [...renterSnapshot.docs, ...ownerSnapshot.docs];
            const byId = new Map();
            merged.forEach((d) => byId.set(d.id, d));
            docs = [...byId.values()];
        } else {
            const snapshot = await getDocs(requestsRef);
            docs = snapshot.docs;
        }

        let data = docs.map((snap) => ({ id: snap.id, ...snap.data() }));

        if (filters.status) {
            data = data.filter((item) => item.status === filters.status);
        }

        return ok(data);
    } catch (error) {
        return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to fetch requests', toErrorDetails(error));
    }
}

export async function updateRequestStatus({ requestId, actorId, status }) {
    const nextStatus = String(status || '').toLowerCase();
    const allowedStatuses = new Set(['approved', 'rejected', 'cancelled', 'completed']);

    if (!requestId || !actorId || !allowedStatuses.has(nextStatus)) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'requestId, actorId and valid status are required');
    }

    try {
        const requestRef = doc(db, REQUESTS_COLLECTION, requestId);
        const requestSnap = await getDoc(requestRef);
        if (!requestSnap.exists()) {
            return fail(ServiceErrorCode.NOT_FOUND, 'Request not found');
        }

        const request = requestSnap.data();
        const isOwner = request.ownerId === actorId;
        const isRenter = request.renterId === actorId;

        if (!isOwner && !isRenter) {
            return fail(ServiceErrorCode.AUTH_ERROR, 'Not authorized to update this request');
        }

        const current = String(request.status || '').toLowerCase();
        if (FINAL_STATUSES.has(current)) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, `Request is already ${current}`);
        }

        const allowedFromPending = isOwner
            ? new Set(['approved', 'rejected'])
            : new Set(['cancelled']);
        const allowedFromApproved = isOwner
            ? new Set(['completed'])
            : new Set(['cancelled']);

        const allowed = current === 'approved' ? allowedFromApproved : allowedFromPending;
        if (!allowed.has(nextStatus)) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, `Cannot change ${current} to ${nextStatus}`);
        }

        if (nextStatus === 'completed' && !['paid', 'cod'].includes(String(request.paymentStatus || 'pending').toLowerCase())) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'Payment must be done before completion');
        }

        await updateDoc(requestRef, { status: nextStatus });

        const listingRef = doc(db, LISTINGS_COLLECTION, request.listingId);
        if (nextStatus === 'approved' && request.requestType === 'rent') {
            const availabilityRef = doc(collection(db, AVAILABILITY_COLLECTION));
            await setDoc(availabilityRef, {
                id: availabilityRef.id,
                equipmentId: request.listingId,
                bookingId: request.id,
                startDate: request.startDate,
                endDate: request.endDate,
                isBlocked: true,
                reason: 'booking',
                createdAt: serverTimestamp(),
            });
        }

        if (nextStatus === 'approved' && request.requestType === 'buy') {
            await updateDoc(listingRef, { isAvailable: false });

            const listingRequestsSnapshot = await getDocs(query(collection(db, REQUESTS_COLLECTION), where('listingId', '==', request.listingId)));
            const updates = listingRequestsSnapshot.docs
                .filter((snap) => snap.id !== requestId)
                .map((snap) => ({ id: snap.id, data: snap.data() }))
                .filter((entry) => entry.data.status === 'pending');

            await Promise.all(
                updates.map((entry) => updateDoc(doc(db, REQUESTS_COLLECTION, entry.id), { status: 'rejected' }))
            );
        }

        if (nextStatus === 'cancelled' && current === 'approved' && request.requestType === 'buy') {
            await updateDoc(listingRef, { isAvailable: true });
        }

        if (nextStatus === 'cancelled' && current === 'approved' && request.requestType === 'rent') {
            const availabilitySnapshot = await getDocs(query(
                collection(db, AVAILABILITY_COLLECTION),
                where('bookingId', '==', request.id),
                where('isBlocked', '==', true)
            ));
            await Promise.all(
                availabilitySnapshot.docs.map((snap) => updateDoc(doc(db, AVAILABILITY_COLLECTION, snap.id), { isBlocked: false, reason: 'cancelled' }))
            );
        }

        return ok({ id: requestId, status: nextStatus });
    } catch (error) {
        return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to update request status', toErrorDetails(error));
    }
}

export async function updatePaymentStatus({ requestId, actorId, paymentStatus }) {
    const nextPaymentStatus = String(paymentStatus || '').toLowerCase();
    if (!requestId || !actorId || !['pending', 'paid', 'cod'].includes(nextPaymentStatus)) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'requestId, actorId and valid paymentStatus are required');
    }

    try {
        const requestRef = doc(db, REQUESTS_COLLECTION, requestId);
        const requestSnap = await getDoc(requestRef);
        if (!requestSnap.exists()) {
            return fail(ServiceErrorCode.NOT_FOUND, 'Request not found');
        }

        const request = requestSnap.data();
        const isRenter = request.renterId === actorId;
        if (!isRenter) {
            return fail(ServiceErrorCode.AUTH_ERROR, 'Only farmer can update payment status');
        }

        if (String(request.status || '').toLowerCase() !== 'approved') {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'Payment can be done only after approval');
        }

        await updateDoc(requestRef, { paymentStatus: nextPaymentStatus });
        return ok({ id: requestId, paymentStatus: nextPaymentStatus });
    } catch (error) {
        return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to update payment status', toErrorDetails(error));
    }
}
