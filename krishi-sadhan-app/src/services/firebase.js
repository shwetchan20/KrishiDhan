import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2b6dtAH-Z3wX4RtbueGvEsNCKCYHdGA0",
    authDomain: "krishidhan-e8e19.firebaseapp.com",
    projectId: "krishidhan-e8e19",
    storageBucket: "krishidhan-e8e19.firebasestorage.app",
    messagingSenderId: "507885903575",
    appId: "1:507885903575:web:616f2219ee1da8e7f61a92"
};

const app = initializeApp(firebaseConfig);

// ✅ THESE MUST EXIST
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
