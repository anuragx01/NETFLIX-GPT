// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfmVphsQ33Saf1M7goG8D0WOY0G2dTiAI",
  authDomain: "netflixgpt-712f4.firebaseapp.com",
  projectId: "netflixgpt-712f4",
  storageBucket: "netflixgpt-712f4.firebasestorage.app",
  messagingSenderId: "607140155752",
  appId: "1:607140155752:web:907f38982b7a3be2f286dd",
  measurementId: "G-QBRLMV7YXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const auth = getAuth(app);