<<<<<<< HEAD
=======
// Import the functions you need from the SDKs you need
>>>>>>> 5178a7717863eca96c3925863eaa52776eab7ed1
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

<<<<<<< HEAD
const firebaseConfig = {
    apiKey: "AIzaSyB9l1FAzb-G8mwS2XxaKy1BzonV_r-DKYQ",
    authDomain: "undecided-f3c8a.firebaseapp.com",
    projectId: "undecided-f3c8a",
    storageBucket: "undecided-f3c8a.appspot.com",
    messagingSenderId: "412107851455",
    appId: "1:412107851455:web:9119204fd422079e10e80a"
  };

=======
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9l1FAzb-G8mwS2XxaKy1BzonV_r-DKYQ",
  authDomain: "undecided-f3c8a.firebaseapp.com",
  projectId: "undecided-f3c8a",
  storageBucket: "undecided-f3c8a.appspot.com",
  messagingSenderId: "412107851455",
  appId: "1:412107851455:web:9119204fd422079e10e80a"
};

// Initialize Firebase
>>>>>>> 5178a7717863eca96c3925863eaa52776eab7ed1
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);