// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy2rr9LGq3u9wQ9SNnkLeVs_S7Acn2tjA",
  authDomain: "expense-log-7a402.firebaseapp.com",
  projectId: "expense-log-7a402",
  storageBucket: "expense-log-7a402.appspot.com",
  messagingSenderId: "613268522343",
  appId: "1:613268522343:web:b89635f404189f6f4b1bc2",
  measurementId: "G-1WE6X449DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

