// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrFNg4KGfQNuVdXTyhSvTwOGXVyN4n3FE",
  authDomain: "studybuddy-53d89.firebaseapp.com",
  projectId: "studybuddy-53d89",
  storageBucket: "studybuddy-53d89.appspot.com",  // fixed this line
  messagingSenderId: "893901552685",
  appId: "1:893901552685:web:e87cb1cb0248d5d20c0ca4",
  measurementId: "G-5J437KDY4E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);  // added storage export
