import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5drGmSFGdkHaF0AcVaPZFN5SX1ct6vkg",
  authDomain: "ayurlanka-2bd6e.firebaseapp.com",
  projectId: "ayurlanka-2bd6e",
  storageBucket: "ayurlanka-2bd6e.firebasestorage.app",
  messagingSenderId: "488392901048",
  appId: "1:488392901048:web:997ddf91aa66c63bbd4f4d",
  measurementId: "G-1YMBFQSETY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
