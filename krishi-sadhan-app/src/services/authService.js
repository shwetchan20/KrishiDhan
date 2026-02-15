import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { ServiceErrorCode, fail, ok, toErrorDetails } from './errors';
import { validateUserPayload } from './schema';

const USERS_COLLECTION = 'users';

export async function createUser(data) {
    const validated = validateUserPayload(data);
    if (!validated.ok) return validated;

    try {
        const payload = validated.data;
        const userRef = doc(db, USERS_COLLECTION, payload.uid);

        await setDoc(userRef, {
            uid: payload.uid,
            name: payload.name,
            phone: payload.phone,
            city: payload.city,
            photoURL: payload.photoURL || '',
            role: payload.role,
        }, { merge: true });

        return ok(payload);
    } catch (error) {
        return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to create user', toErrorDetails(error));
    }
}

export async function getUser(uid) {
    if (!uid || typeof uid !== 'string') {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'uid is required');
    }

    try {
        const userRef = doc(db, USERS_COLLECTION, uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
            return fail(ServiceErrorCode.NOT_FOUND, 'User not found', { uid });
        }

        return ok(snap.data());
    } catch (error) {
        return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to fetch user', toErrorDetails(error));
    }
}

export async function updateUser(data) {
    const validated = validateUserPayload(data);
    if (!validated.ok) return validated;

    try {
        const payload = validated.data;
        const userRef = doc(db, USERS_COLLECTION, payload.uid);

        await setDoc(userRef, {
            uid: payload.uid,
            name: payload.name,
            phone: payload.phone,
            city: payload.city,
            photoURL: payload.photoURL || '',
            role: payload.role,
        }, { merge: true });

        return ok(payload);
    } catch (error) {
        return fail(ServiceErrorCode.FIRESTORE_ERROR, 'Failed to update user', toErrorDetails(error));
    }
}

export async function registerWithEmail({ email, password, name, phone, city, photoURL = '', role = 'farmer' }) {
    if (!email || !password) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'email and password are required');
    }

    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const uid = result.user.uid;

        const created = await createUser({ uid, name, phone, city, photoURL, role });
        if (!created.ok) return created;

        return ok({ uid, email: result.user.email });
    } catch (error) {
        return fail(ServiceErrorCode.AUTH_ERROR, 'Registration failed', toErrorDetails(error));
    }
}

export async function loginWithEmail({ email, password }) {
    if (!email || !password) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'email and password are required');
    }

    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const uid = result.user.uid;

        const userResult = await getUser(uid);
        if (!userResult.ok) return userResult;

        return ok({ uid, email: result.user.email, profile: userResult.data });
    } catch (error) {
        return fail(ServiceErrorCode.AUTH_ERROR, 'Login failed', toErrorDetails(error));
    }
}

export async function logout() {
    try {
        await signOut(auth);
        return ok(true);
    } catch (error) {
        return fail(ServiceErrorCode.AUTH_ERROR, 'Logout failed', toErrorDetails(error));
    }
}
