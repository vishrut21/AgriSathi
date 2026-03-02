// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (from your screenshot)
const firebaseConfig = {
  apiKey: "AIzaSyBgsARx18-1hnivf2Hyp1Vm-jYpiBKhq2k",
  authDomain: "agrisathi-farmers.firebaseapp.com",
  projectId: "agrisathi-farmers",
  storageBucket: "agrisathi-farmers.firebasestorage.app",
  messagingSenderId: "14326822929",
  appId: "1:14326822929:web:8febd39ce13e62829799b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and export it
export const auth = getAuth(app);

export default app;