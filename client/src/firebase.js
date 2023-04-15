import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDS4WH25sXnYQh55MxTIM6M6LsBu-81DcE",
  authDomain: "drafteditor-beta-d6daf.firebaseapp.com",
  projectId: "drafteditor-beta-d6daf",
  storageBucket: "drafteditor-beta-d6daf.appspot.com",
  messagingSenderId: "459023679819",
  appId: "1:459023679819:web:dab9cd5940f390c0e7e8ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);