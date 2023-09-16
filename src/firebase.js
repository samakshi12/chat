import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyANmUFk8c3wVhaTylRc6HfHYN9fhS9hsho",
  authDomain: "connect3-a8c32.firebaseapp.com",
  projectId: "connect3-a8c32",
  storageBucket: "connect3-a8c32.appspot.com",
  messagingSenderId: "1035271191535",
  appId: "1:1035271191535:web:e2e667296f7feb91dc141a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();