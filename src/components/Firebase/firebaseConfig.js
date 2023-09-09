import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyCGgIF-FBxiBTm0IYxHiMm2qT1RFJhQRNw",

  authDomain: "marvelquizz-37239.firebaseapp.com",

  projectId: "marvelquizz-37239",

  storageBucket: "marvelquizz-37239.appspot.com",

  messagingSenderId: "277799484690",

  appId: "1:277799484690:web:5e6ebd20a011f6a03707cb"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

