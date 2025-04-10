// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
const db = getFirestore(app);

// Set debug token for development environment BEFORE initializing App Check
if (process.env.NODE_ENV === 'development') {
  // Development mode - use debug token
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_APPCHECK_DEBUG_TOKEN;
  console.log('Debug token set:', process.env.REACT_APP_APPCHECK_DEBUG_TOKEN);
}

// Initialize App Check
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true // Auto-refresh tokens
});

console.log('Environment:', process.env.NODE_ENV);
console.log('ReCaptcha Site Key:', process.env.REACT_APP_RECAPTCHA_SITE_KEY);

export { db }