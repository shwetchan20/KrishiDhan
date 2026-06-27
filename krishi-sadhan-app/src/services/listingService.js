import { db } from "./firebase";

import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    getDoc,
    doc,
    deleteDoc
} from "firebase/firestore";


// ------------------------------------
// Create Listing
// ------------------------------------

export async function createListing(data) {

    try {

        const docRef = await addDoc(
            collection(db, "listings"),
            {
                ...data,
                createdAt: serverTimestamp(),
                isAvailable: true
            }
        );

        return {

            ok: true,

            id: docRef.id

        };

    }

    catch (err) {

        console.error(err);

        return {

            ok: false,

            message: err.message

        };

    }

}


// ------------------------------------
// Get All Listings
// ------------------------------------

export async function getListings() {

    try {

        const snapshot = await getDocs(
            collection(db, "listings")
        );

        const listings = snapshot.docs.map(doc => ({

            id: doc.id,

            ...doc.data()

        }));

        return {

            ok: true,

            data: listings

        };

    }

    catch (err) {

        console.error(err);

        return {

            ok: false,

            message: err.message

        };

    }

}


// ------------------------------------
// Get Single Listing
// ------------------------------------

export async function getListingById(id) {

    try {

        const snapshot = await getDoc(
            doc(db, "listings", id)
        );

        if (!snapshot.exists()) {

            return {

                ok: false,

                message: "Listing not found"

            };

        }

        return {

            ok: true,

            data: {

                id: snapshot.id,

                ...snapshot.data()

            }

        };

    }

    catch (err) {

        console.error(err);

        return {

            ok: false,

            message: err.message

        };

    }

}


// ------------------------------------
// Delete Listing
// ------------------------------------

export async function deleteListing(id) {

    try {

        await deleteDoc(
            doc(db, "listings", id)
        );

        return {

            ok: true

        };

    }

    catch (err) {

        console.error(err);

        return {

            ok: false,

            message: err.message

        };

    }

}