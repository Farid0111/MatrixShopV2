import { initializeApp } from "firebase/app";
import { getFirestore, enableMultiTabIndexedDbPersistence } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCesJawM_d5I8lF9984c42L1_8DnLas8I4",
  authDomain: "matrixshop-5600a.firebaseapp.com",
  projectId: "matrixshop-5600a",
  storageBucket: "matrixshop-5600a.firebasestorage.app",
  messagingSenderId: "390166565853",
  appId: "1:390166565853:web:7a2e6325f666aee03c5c34"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Enable offline persistence for Firestore
enableMultiTabIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser doesn\'t support persistence.');
    }
  });

// Set auth persistence to LOCAL
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

export default app;