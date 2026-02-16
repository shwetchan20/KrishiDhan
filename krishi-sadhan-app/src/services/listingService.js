import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    where,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { ServiceErrorCode, fail, ok, toErrorDetails } from './errors';
import { validateListingPayload } from './schema';

const LISTINGS_COLLECTION = 'listings';

export async function createListing(data) {
    const validated = validateListingPayload(data);
    if (!validated.ok) return validated;

    try {
        const payload = validated.data;
        const listingRef = payload.id
            ? doc(db, LISTINGS_COLLECTION, payload.id)
            : doc(collection(db, LISTINGS_COLLECTION));

        const listing = {
            id: listingRef.id,
            ownerId: payload.ownerId,
            title: payload.title,
            description: payload.description,
            category: payload.category,
            city: payload.city,
            lat: payload.lat,
            lng: payload.lng,
            images: payload.images,
            listingType: payload.listingType,
            pricePerDay: payload.pricePerDay,
            priceUnit: payload.priceUnit,
            sellPrice: payload.sellPrice,
            isAvailable: payload.isAvailable,
            createdAt: serverTimestamp(),
        };

        await setDoc(listingRef, listing, { merge: true });
        return ok({ id: listingRef.id, ...listing });
    } catch (error) {
        return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to create listing', toErrorDetails(error));
    }
}

export async function getListings(filters = {}) {
    try {
        const constraints = [];

        if (filters.listingType) constraints.push(where('listingType', '==', filters.listingType));
        if (filters.city) constraints.push(where('city', '==', filters.city));
        if (filters.category) constraints.push(where('category', '==', filters.category));
        if (filters.ownerId) constraints.push(where('ownerId', '==', filters.ownerId));
        if (typeof filters.isAvailable === 'boolean') constraints.push(where('isAvailable', '==', filters.isAvailable));

        constraints.push(orderBy('createdAt', 'desc'));
        if (filters.limitCount) constraints.push(limit(Number(filters.limitCount)));

        const listingsRef = collection(db, LISTINGS_COLLECTION);
        const q = query(listingsRef, ...constraints);
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }));
        return ok(data);
    } catch {
        // Fallback for missing composite index / query constraint issues:
        // fetch all listings, then filter and sort client-side.
        try {
            const listingsRef = collection(db, LISTINGS_COLLECTION);
            const snapshot = await getDocs(listingsRef);

            let data = snapshot.docs.map((snap) => ({ id: snap.id, ...snap.data() }));

            if (filters.listingType) data = data.filter((item) => item.listingType === filters.listingType);
            if (filters.city) data = data.filter((item) => item.city === filters.city);
            if (filters.category) data = data.filter((item) => item.category === filters.category);
            if (filters.ownerId) data = data.filter((item) => item.ownerId === filters.ownerId);
            if (typeof filters.isAvailable === 'boolean') data = data.filter((item) => item.isAvailable === filters.isAvailable);

            data.sort((a, b) => {
                const aTime = a?.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                const bTime = b?.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                return bTime - aTime;
            });

            if (filters.limitCount) {
                data = data.slice(0, Number(filters.limitCount));
            }

            return ok(data);
        } catch (fallbackError) {
            return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to fetch listings', toErrorDetails(fallbackError));
        }
    }
}

export async function getListingById(id) {
    if (!id || typeof id !== 'string') {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'id is required');
    }

    try {
        const listingRef = doc(db, LISTINGS_COLLECTION, id);
        const snap = await getDoc(listingRef);

        if (!snap.exists()) {
            return fail(ServiceErrorCode.NOT_FOUND, 'Listing not found', { id });
        }

        return ok({ id: snap.id, ...snap.data() });
    } catch (error) {
        return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to fetch listing', toErrorDetails(error));
    }
}

export async function deleteListing({ listingId, actorId }) {
    if (!listingId || !actorId) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'listingId and actorId are required');
    }

    try {
        const listingRef = doc(db, LISTINGS_COLLECTION, listingId);
        const snap = await getDoc(listingRef);
        if (!snap.exists()) {
            return fail(ServiceErrorCode.NOT_FOUND, 'Listing not found', { listingId });
        }

        const listing = snap.data();
        if (listing.ownerId !== actorId) {
            return fail(ServiceErrorCode.AUTH_ERROR, 'Only owner can delete listing');
        }

        await deleteDoc(listingRef);
        return ok({ id: listingId, deleted: true });
    } catch (error) {
        return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to delete listing', toErrorDetails(error));
    }
}
