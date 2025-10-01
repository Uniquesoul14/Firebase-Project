import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot
} from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA8FX0JIG3T33VIwE95e4wab6VknGH5zeE",
  authDomain: "whtasapp-clone-531d6.firebaseapp.com",
  projectId: "whtasapp-clone-531d6",
  storageBucket: "whtasapp-clone-531d6.appspot.com",
  messagingSenderId: "244418829107",
  appId: "1:244418829107:web:dac8c7f3f620c0dce43c46",
  measurementId: "G-6LKT1J06NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth, db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot
};
