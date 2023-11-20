import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyClNHI4_OpfDz0PkqDvKgSZMcnArcj2TDI",
  authDomain: "avaliacao0003.firebaseapp.com",
  databaseURL: "https://avaliacao0003-default-rtdb.firebaseio.com/",
  projectId: "avaliacao0003",
  storageBucket: "avaliacao0003.appspot.com",
  messagingSenderId: "708719987689",
  appId: "1:708719987689:web:d257f150d061f8bb79d978",
  measurementId: "G-W9C1JEGSX9"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db, app };