import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP8a028eW4bbrQjIVmfPvW9OX-Pcv_50k",
  authDomain: "task-1f791.firebaseapp.com",
  projectId: "task-1f791",
  storageBucket: "task-1f791.firebasestorage.app",
  messagingSenderId: "27658371742",
  appId: "1:27658371742:web:120dae4b1201438ab2718f",
  measurementId: "G-97P72JBF00"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;









