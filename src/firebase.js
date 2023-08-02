// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnXaCLYlLpGz0YYsuhg8m0fzXBUF3dOLs",
  authDomain: "photofolio-ed17a.firebaseapp.com",
  projectId: "photofolio-ed17a",
  storageBucket: "photofolio-ed17a.appspot.com",
  messagingSenderId: "156404430368",
  appId: "1:156404430368:web:70fd3add78b51c1811ee45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
