import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCDOqafNG9IItWc3_HY1Oak4jf1c1v8clU",
    authDomain: "next-gen-tcc.firebaseapp.com",
    projectId: "next-gen-tcc",
    storageBucket: "next-gen-tcc.firebasestorage.app",
    messagingSenderId: "688643974899",
    appId: "1:688643974899:web:3aab81fd1b412ca89ef986"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)