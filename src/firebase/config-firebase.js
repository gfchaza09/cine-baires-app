// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { GoogleAuthProvider } from "firebase/auth";

import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCT7TIT_eGfS9A42C5Mq8fxBlrG2otgLUk",
    authDomain: "cine-baires-app.firebaseapp.com",
    projectId: "cine-baires-app",
    storageBucket: "cine-baires-app.appspot.com",
    messagingSenderId: "354574344171",
    appId: "1:354574344171:web:31bc817541224f376a03ae"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const googleAuthProvider = new GoogleAuthProvider();

  export { db, googleAuthProvider };