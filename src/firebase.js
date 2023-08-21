
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSGayAJ5g9Yn6Bxail48JlA8F1njPHQ8k",
  authDomain: "unihub-app.firebaseapp.com",
  databaseURL: "https://unihub-app-default-rtdb.firebaseio.com",
  projectId: "unihub-app",
  storageBucket: "unihub-app.appspot.com",
  messagingSenderId: "444829181838",
  appId: "1:444829181838:web:46a2856f003bfe2d60a6df",
  measurementId: "G-KM9TVHGWBV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
  
const analytics = getAnalytics(app);
export const database = getDatabase(app)