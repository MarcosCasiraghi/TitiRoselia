// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrTS3aLnRrWAB8aosn-ltQ9UsvGE3IWYc",
  authDomain: "titiroselia-a4fc9.firebaseapp.com",
  projectId: "titiroselia-a4fc9",
  storageBucket: "titiroselia-a4fc9.firebasestorage.app",
  messagingSenderId: "803373991025",
  appId: "1:803373991025:web:7ceeda5920713ae09247d0",
  measurementId: "G-TM5R199S1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}