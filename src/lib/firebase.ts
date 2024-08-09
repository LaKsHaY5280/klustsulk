// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLQIJR3potLiS7aTPhFixwoHfOZ_8lzt0",
  authDomain: "klustsulk.firebaseapp.com",
  projectId: "klustsulk",
  storageBucket: "klustsulk.appspot.com",
  messagingSenderId: "617218372479",
  appId: "1:617218372479:web:4dbd60d22655facf54e04a",
  measurementId: "G-9RK5NN54ET",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
