// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDujVw64KBtNYHrnGgUsdOKMAKZra8RU90",
  authDomain: "inventory-managment-fc3b5.firebaseapp.com",
  projectId: "inventory-managment-fc3b5",
  storageBucket: "inventory-managment-fc3b5.appspot.com",
  messagingSenderId: "676078964552",
  appId: "1:676078964552:web:8eb42bc4632ade2b49ad7d",
  measurementId: "G-ECBB58D18T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}