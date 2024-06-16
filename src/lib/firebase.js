import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDI-pfP4xo9dwaIYJJhvyaHXVUAZsJ4yYM",
  authDomain: "telegram-bot-6b14d.firebaseapp.com",
  projectId: "telegram-bot-6b14d",
  storageBucket: "telegram-bot-6b14d.appspot.com",
  messagingSenderId: "907049014262",
  appId: "1:907049014262:web:5bbe8d354bacadb8976dd7",
  measurementId: "G-044GV8ZV81",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
if (typeof window !== "undefined") {
  getAnalytics(app);
}
const storage = getStorage(app);


export { db, storage };
