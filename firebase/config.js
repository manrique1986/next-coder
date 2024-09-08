// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8xgLjV5BSZYlWHkiqYqjIgYUoSZx0FZQ",
  authDomain: "alta-pinta-95816.firebaseapp.com",
  projectId: "alta-pinta-95816",
  storageBucket: "alta-pinta-95816.appspot.com",
  messagingSenderId: "727307212511",
  appId: "1:727307212511:web:fedfd7551dd4fc4decfb6a",
  measurementId: "G-SBF9S7WXHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export const auth = getAuth(app);

export {
  db
}