// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEEtmmJJdwKY5g5uC7qAyAn8TnTuRdmj0",
  authDomain: "vite-contact-ab767.firebaseapp.com",
  projectId: "vite-contact-ab767",
  storageBucket: "vite-contact-ab767.firebasestorage.app",
  messagingSenderId: "399552374359",
  appId: "1:399552374359:web:d727a5c8ff5300c273e512"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);