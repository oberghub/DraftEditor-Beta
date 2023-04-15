import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA5nNSyVnCZWX_tUVNC5lnetB3FSHNfp-A",
  authDomain: "drafteditor-beta.firebaseapp.com",
  projectId: "drafteditor-beta",
  storageBucket: "drafteditor-beta.appspot.com",
  messagingSenderId: "157612910896",
  appId: "1:157612910896:web:ac28c90c0acf62403800f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);