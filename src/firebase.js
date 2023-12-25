// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqYxXweVaaBQhug3w81Wk6NirkvyaxVPs",
  authDomain: "blinkmart-ecommerce-project.firebaseapp.com",
  projectId: "blinkmart-ecommerce-project",
  storageBucket: "blinkmart-ecommerce-project.appspot.com",
  messagingSenderId: "11284754473",
  appId: "1:11284754473:web:405d5b939c6d5374a1ac38",
  measurementId: "G-HZLGQDEQNN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
