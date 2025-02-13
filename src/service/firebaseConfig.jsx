// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgJjIkn4uH6IUCDGsw0sHX2Bd3u4S1Brw",
  authDomain: "ai-travel-planner-b1255.firebaseapp.com",
  projectId: "ai-travel-planner-b1255",
  storageBucket: "ai-travel-planner-b1255.firebasestorage.app",
  messagingSenderId: "501940818509",
  appId: "1:501940818509:web:6db4c0ab3ee111095c8204",
  measurementId: "G-YR9VLH66KW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app);