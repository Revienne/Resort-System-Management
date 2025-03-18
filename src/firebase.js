// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9AggxGntSGkziXbxVwM0crGCZyFRumN0",
  authDomain: "resort-management-system-db2fb.firebaseapp.com",
  projectId: "resort-management-system-db2fb",
  storageBucket: "resort-management-system-db2fb.firebasestorage.app",
  messagingSenderId: "16021670846",
  appId: "1:16021670846:web:d7be03a025a0e1b9e947ef",
  measurementId: "G-GDWK9RDDE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };