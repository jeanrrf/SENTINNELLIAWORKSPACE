import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2y8IZwXipqWU_7x0g2M_iJy_jiujrJrI",
  authDomain: "sentinnellworkstation.firebaseapp.com",
  projectId: "sentinnellworkstation",
  storageBucket: "sentinnellworkstation.firebasestorage.app",
  messagingSenderId: "166030476995",
  appId: "1:166030476995:web:06c9785ef1f74cfc314476",
  measurementId: "G-2KNM8QZEFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };