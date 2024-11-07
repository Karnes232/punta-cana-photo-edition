import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBFWdPNB06iNH86rwhvAA0_qKdYBFMnkIo",
  authDomain: "punta-cana-photo-edition-dbf44.firebaseapp.com",
  projectId: "punta-cana-photo-edition-dbf44",
  storageBucket: "punta-cana-photo-edition-dbf44.firebasestorage.app",
  messagingSenderId: "28085739852",
  appId: "1:28085739852:web:98220096ba294bf8842fe9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
