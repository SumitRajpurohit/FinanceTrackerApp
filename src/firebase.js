// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq5JwLY9407lgW1SmBav4XhFqc7_7paJk",
  authDomain: "financely---finance-tracker.firebaseapp.com",
  projectId: "financely---finance-tracker",
  storageBucket: "financely---finance-tracker.appspot.com",
  messagingSenderId: "771319052412",
  appId: "1:771319052412:web:4bdf45e57ad94e6de5b1f9",
  measurementId: "G-MHB4G7P2VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
