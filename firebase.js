// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import firebase from 'firebase'

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbWCpX66SoT01xEXwsI5CRC1uO7aaSYy0",
  authDomain: "authenticationapp-3578e.firebaseapp.com",
  databaseURL: "https://authenticationapp-3578e-default-rtdb.firebaseio.com",
  projectId: "authenticationapp-3578e",
  storageBucket: "authenticationapp-3578e.appspot.com",
  messagingSenderId: "1462505544",
  appId: "1:1462505544:web:7d7fef1b9e041f87c8087d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const db = firebase.firestore();
//firebase.firestore().settings({ experimentalForceLongPolling: true, merge:true });
//export const db = getFirestore(app);
export const auth = getAuth(app);