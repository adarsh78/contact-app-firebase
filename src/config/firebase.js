// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIal9DOfDLFOES06rJspTuYxZ8chnb3wU",
  authDomain: "vite-contact-2aaa3.firebaseapp.com",
  projectId: "vite-contact-2aaa3",
  storageBucket: "vite-contact-2aaa3.appspot.com",
  messagingSenderId: "156756002891",
  appId: "1:156756002891:web:b89ea8efee2732acab65ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);