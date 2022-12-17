// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHAyuaZbyl9EhV2Ye0C0ZU481JPHRsEik",
  authDomain: "mobflix-c803c.firebaseapp.com",
  projectId: "mobflix-c803c",
  storageBucket: "mobflix-c803c.appspot.com",
  messagingSenderId: "398687609956",
  appId: "1:398687609956:web:9edc1155a18a0e09ea6b71"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig):getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export {auth,db}