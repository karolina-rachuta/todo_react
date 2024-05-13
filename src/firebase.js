import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1s5waq-zruhgHsYQ2vOW4PwDz7t1CXOc",
  authDomain: "todo-ebf44.firebaseapp.com",
  projectId: "todo-ebf44",
  storageBucket: "todo-ebf44.appspot.com",
  messagingSenderId: "530989111621",
  appId: "1:530989111621:web:b354725538983d7370462c"
};

const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);
export default firebase;