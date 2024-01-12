// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjD6TYg6C27Xg_y4zydt2g3xBYxxCRZ6Y",
  authDomain: "gamaoutillage-59a38.firebaseapp.com",
  projectId: "gamaoutillage-59a38",
  storageBucket: "gamaoutillage-59a38.appspot.com",
  messagingSenderId: "701425524344",
  appId: "1:701425524344:web:9e7231fd1a33e5de8ed78d",
  measurementId: "G-NTJ8SKP50W"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export {firebaseApp, firestoreDb , auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, onAuthStateChanged}