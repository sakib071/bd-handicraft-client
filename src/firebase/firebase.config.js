// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: import.meta.env.VITE_apiKey,
    // authDomain: import.meta.env.VITE_authDomain,
    // projectId: import.meta.env.VITE_projectId,
    // storageBucket: import.meta.env.VITE_storageBucket,
    // messagingSenderId: import.meta.env.VITE_messagingSenderId,
    // appId: import.meta.env.VITE_appId
    apiKey: "AIzaSyDCrrN9jfu5hHpSAszrjHd_6BI65LQk3Ew",
    authDomain: "bistro-boss-3ad80.firebaseapp.com",
    projectId: "bistro-boss-3ad80",
    storageBucket: "bistro-boss-3ad80.appspot.com",
    messagingSenderId: "410122293670",
    appId: "1:410122293670:web:a391e6639fd7e8e288ff67"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);