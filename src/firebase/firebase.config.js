// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt4RQDeZyux7MDQXdBjVU_Y8ESl9o9iWg",
  authDomain: "krishilink-project-1452e.firebaseapp.com",
  projectId: "krishilink-project-1452e",
  storageBucket: "krishilink-project-1452e.firebasestorage.app",
  messagingSenderId: "480001281963",
  appId: "1:480001281963:web:6bffb4ea7d8fc8b2524cee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;