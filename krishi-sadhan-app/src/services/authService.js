import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where
} from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth, db, isFirebaseConfigured, missingFirebaseEnv } from './firebase';
import { ServiceErrorCode, fail, ok, toErrorDetails } from './errors';
import { validateUserPayload } from './schema';

const USERS_COLLECTION = 'users';

const getLocalUsers = () => {
    try {
        return JSON.parse(localStorage.getItem('kd_local_users') || '{}');
    } catch {
        return {};
    }
};

const saveLocalUser = (user) => {
    try {
        const users = getLocalUsers();
        // Strip any stale password from cache before saving
        const { password: _discarded, ...safeUser } = user;
        const emailKey = (safeUser.email || '').toLowerCase();
        if (emailKey) {
            users[emailKey] = safeUser;
        }
        if (safeUser.uid) {
            users[safeUser.uid] = safeUser;
        }
        localStorage.setItem('kd_local_users', JSON.stringify(users));
    } catch (e) {
        console.error('Failed to save local user cache', e);
    }
};

const findLocalUser = (emailOrUid) => {
    const users = getLocalUsers();
    return users[String(emailOrUid).toLowerCase()] || users[emailOrUid] || null;
};

// ------------------------------------
// Create or Update User Document in Firestore
// ------------------------------------
export async function createUser(data) {
    const validated = validateUserPayload(data);
    if (!validated.ok) return validated;

    const payload = validated.data;
    try {
        const userRef = doc(db, USERS_COLLECTION, payload.uid);
        await setDoc(userRef, {
            uid: payload.uid,
            email: payload.email || '',
            name: payload.name,
            phone: payload.phone,
            city: payload.city,
            photoURL: payload.photoURL || '',
            role: payload.role || 'farmer',
            updatedAt: serverTimestamp(),
        }, { merge: true });

        console.log('[KrishiDhan] Successfully stored user in Firebase Firestore:', payload.uid);
        saveLocalUser(payload);
        return ok(payload);
    } catch (error) {
        console.error('[KrishiDhan] Firestore createUser error:', error);
        saveLocalUser(payload);
        return ok(payload);
    }
}

// ------------------------------------
// Get User Profile from Firestore / Cache
// ------------------------------------
export async function getUser(uidOrEmail) {
    if (!uidOrEmail || typeof uidOrEmail !== 'string') {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'uid or email is required');
    }

    // 1. Try Firestore by UID document ID
    try {
        const userRef = doc(db, USERS_COLLECTION, uidOrEmail);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
            return ok({ id: snap.id, ...snap.data() });
        }
    } catch (error) {
        console.warn('[KrishiDhan] Firestore direct getDoc error:', error.message);
    }

    // 2. If it looks like an email or not found by direct ID, query by email field
    if (uidOrEmail.includes('@')) {
        try {
            const q = query(collection(db, USERS_COLLECTION), where('email', '==', uidOrEmail.toLowerCase().trim()));
            const snap = await getDocs(q);
            if (!snap.empty) {
                const docSnap = snap.docs[0];
                return ok({ id: docSnap.id, ...docSnap.data() });
            }
        } catch (error) {
            console.warn('[KrishiDhan] Firestore email query error:', error.message);
        }
    }

    // 3. Fallback to local storage cache
    const localUser = findLocalUser(uidOrEmail);
    if (localUser) {
        return ok(localUser);
    }

    try {
        const active = JSON.parse(localStorage.getItem('kd_user') || 'null');
        if (active && (active.uid === uidOrEmail || active.email === uidOrEmail)) {
            return ok(active);
        }
    } catch {}

    return fail(ServiceErrorCode.NOT_FOUND, 'User not found in Firebase or local cache', { uid: uidOrEmail });
}

export async function updateUser(data) {
    return await createUser(data);
}

// ------------------------------------
// Register with Email & Password
// ------------------------------------
export async function registerWithEmail({ email, password, name, phone, city, photoURL = '', role = 'farmer' }) {
    if (!email || !password) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'Email and password are required');
    }
    if (password.length < 6) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'Password must be at least 6 characters long');
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!isFirebaseConfigured || !auth) {
        return fail(
            ServiceErrorCode.CONFIG_MISSING,
            `Firebase configuration incomplete on server. Missing: ${missingFirebaseEnv.join(', ')}. Please add them to Vercel Environment Variables.`
        );
    }

    let uid = null;
    // 1. Attempt standard Firebase Authentication
    try {
        const result = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        const uid = result.user.uid;
        const registeredEmail = result.user.email;
        console.log('[KrishiDhan] Firebase Auth registration success, UID:', uid);

        // 2. ALWAYS store the full farmer profile in Cloud Firestore (users collection)
        const userPayload = {
            uid,
            email: registeredEmail,
            name: name.trim(),
            phone: phone.trim(),
            city: city.trim(),
            photoURL,
            role
        };

        await createUser(userPayload);
        saveLocalUser(userPayload);

        return ok({ uid, email: registeredEmail, profile: userPayload });
    } catch (error) {
        console.warn('[KrishiDhan] Firebase Auth response:', error.code, error.message);

        if (error.code === 'auth/email-already-in-use') {
            return fail(ServiceErrorCode.AUTH_ERROR, 'This email is already registered. Please go to Login.');
        }
        if (error.code === 'auth/invalid-email') {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'Please enter a valid email address.');
        }
        if (error.code === 'auth/weak-password') {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'Password should be at least 6 characters.');
        }
        if (error.code === 'auth/operation-not-allowed') {
            return fail(ServiceErrorCode.AUTH_ERROR, 'Email/Password sign-in is not enabled in Firebase Console. Please enable it under Authentication > Sign-in method.');
        }
        if (error.code === 'auth/network-request-failed') {
            return fail(ServiceErrorCode.AUTH_ERROR, 'Network error. Please check your internet connection.');
        }
        const msg = error.message ? `Registration failed (${error.code || 'error'}): ${error.message}` : 'Failed to register with Firebase Auth.';
        return fail(ServiceErrorCode.FIRESTORE_ERROR, msg, toErrorDetails(error));
    }
}

// ------------------------------------
// Login with Email & Password
// ------------------------------------
export async function loginWithEmail({ email, password }) {
    if (!email || !password) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'Email and password are required');
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!isFirebaseConfigured || !auth) {
        return fail(
            ServiceErrorCode.CONFIG_MISSING,
            `Firebase configuration incomplete on server. Missing: ${missingFirebaseEnv.join(', ')}. Please add them to Vercel Environment Variables.`
        );
    }

    // 1. Try Firebase Authentication first
    try {
        const result = await signInWithEmailAndPassword(auth, cleanEmail, password);
        const uid = result.user.uid;

        const userResult = await getUser(uid);
        let profile = userResult.ok ? userResult.data : null;

        if (!profile) {
            // Profile doc doesn't exist yet (e.g. registered before firestore sync).
            // Synthesize minimal profile and persist so user is not locked out.
            profile = {
                uid,
                email: result.user.email,
                name: result.user.displayName || cleanEmail.split('@')[0],
                phone: '',
                city: '',
                role: 'farmer'
            };
            await createUser(profile);
        }

        saveLocalUser(profile);
        return ok({ uid, email: result.user.email, profile });
    } catch (error) {
        console.warn('[KrishiDhan] Firebase Auth sign-in error:', error.code || error.message);

        if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            return fail(ServiceErrorCode.AUTH_ERROR, 'Incorrect email or password. Please verify and try again.');
        }

        if (error.code === 'auth/user-not-found') {
            return fail(ServiceErrorCode.NOT_FOUND, 'No account found with this email. Please register first.');
        }

        if (error.code === 'auth/too-many-requests') {
            return fail(ServiceErrorCode.AUTH_ERROR, 'Access temporarily disabled due to many failed login attempts. Please reset password or try later.');
        }

        if (error.code === 'auth/network-request-failed') {
            return fail(ServiceErrorCode.AUTH_ERROR, 'Network error. Please check your internet connection.');
        }

        const msg = error.message ? `Login failed (${error.code || 'error'}): ${error.message}` : 'Login failed. Please check credentials.';
        return fail(ServiceErrorCode.AUTH_ERROR, msg, toErrorDetails(error));
    }
}

// ------------------------------------
// Sign Out
// ------------------------------------
export async function logout() {
    try {
        await signOut(auth);
    } catch {}
    localStorage.removeItem('kd_uid');
    localStorage.removeItem('kd_user');
    return ok(true);
}

// ------------------------------------
// Delete User from Firestore & Local Cache
// ------------------------------------
export async function deleteUser(uid) {
    if (!uid) return fail(ServiceErrorCode.VALIDATION_ERROR, 'uid is required');

    try {
        await deleteDoc(doc(db, USERS_COLLECTION, uid));
        console.log('[KrishiDhan] Deleted user from Firestore:', uid);
    } catch (err) {
        console.warn('[KrishiDhan] Firestore deleteUser error:', err.message);
    }

    try {
        const users = getLocalUsers();
        delete users[uid];
        localStorage.setItem('kd_local_users', JSON.stringify(users));
    } catch {}

    return ok(true);
}

