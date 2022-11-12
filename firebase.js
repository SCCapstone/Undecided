import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9l1FAzb-G8mwS2XxaKy1BzonV_r-DKYQ",
    authDomain: "undecided-f3c8a.firebaseapp.com",
    projectId: "undecided-f3c8a",
    storageBucket: "undecided-f3c8a.appspot.com",
    messagingSenderId: "412107851455",
    appId: "1:412107851455:web:9119204fd422079e10e80a"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);