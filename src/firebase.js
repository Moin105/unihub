// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
