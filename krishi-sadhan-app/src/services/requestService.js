import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from './firebase';
import { ServiceErrorCode, fail, ok, toErrorDetails } from './errors';
import { validateRequestPayload } from './schema';

const REQUESTS_COLLECTION = 'requests';

export async function createRequest(data) {
    const validated = validateRequestPayload(data);
    if (!validated.ok) return validated;

    try {
        const payload = validated.data;
        const requestRef = payload.id
            ? doc(db, REQUESTS_COLLECTION, payload.id)
            : doc(collection(db, REQUESTS_COLLECTION));

        const request = {
            id: requestRef.id,
            listingId: payload.listingId,
            ownerId: payload.ownerId,
            renterId: payload.renterId,
            requestType: payload.requestType,
            startDate: payload.startDate,
            endDate: payload.endDate,
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
