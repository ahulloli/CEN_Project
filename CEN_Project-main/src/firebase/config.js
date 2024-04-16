// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAd5_-WuW3WssVBBKFYvU1Us2eZn3QQses",
  authDomain: "littlecheftest.firebaseapp.com",
  projectId: "littlecheftest",
  storageBucket: "littlecheftest.appspot.com",
  messagingSenderId: "241470713358",
  appId: "1:241470713358:web:3050b9c56d2c0b98aad65f",
  measurementId: "G-5GCMWMVCTZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, app, db };