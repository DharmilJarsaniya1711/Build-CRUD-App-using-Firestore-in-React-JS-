import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwoUaK9_7ZjWsWWgNnS6tlAZEN8HhWbcM",
  authDomain: "crud-db-app.firebaseapp.com",
  projectId: "crud-db-app",
  storageBucket: "crud-db-app.appspot.com",
  messagingSenderId: "981411297575",
  appId: "1:981411297575:web:37b6a1735ccd33c6d31102"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);