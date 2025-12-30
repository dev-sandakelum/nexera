// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoel5SucClWcbswQr__HhDUSQloySogbM",
  authDomain: "nexera-a2938.firebaseapp.com",
  projectId: "nexera-a2938",
  storageBucket: "nexera-a2938.firebasestorage.app",
  messagingSenderId: "844183674110",
  appId: "1:844183674110:web:9d3f5822bc3c09fd9199af",
  measurementId: "G-JLHY4E8QMJ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
