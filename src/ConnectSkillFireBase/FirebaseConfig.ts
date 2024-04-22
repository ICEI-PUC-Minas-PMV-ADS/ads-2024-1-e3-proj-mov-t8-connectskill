// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY9ioJGF7j37647UBLpnBgquvzhWSaEGA",
  authDomain: "connectskill-ce820.firebaseapp.com",
  projectId: "connectskill-ce820",
  storageBucket: "connectskill-ce820.appspot.com",
  messagingSenderId: "766195578722",
  appId: "1:766195578722:web:5ec5e8e7e6462602ff9e3b"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);