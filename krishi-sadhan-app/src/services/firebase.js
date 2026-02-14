// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2b6dtAH-Z3wX4RtbueGvEsNCKCYHdGA0",
    authDomain: "krishidhan-e8e19.firebaseapp.com",
    projectId: "krishidhan-e8e19",
    storageBucket: "krishidhan-e8e19.firebasestorage.app",
    messagingSenderId: "507885903575",
    appId: "1:507885903575:web:616f2219ee1da8e7f61a92",
    measurementId: "G-ETVHF64ZNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);