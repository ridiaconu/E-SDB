import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4FNczbTvmEg_84IB3OdC61dSvjeKRSYI",
  authDomain: "e-sdb-739c9.firebaseapp.com",
  projectId: "e-sdb-739c9",
  storageBucket: "e-sdb-739c9.appspot.com",
  messagingSenderId: "668871241198",
  appId: "1:668871241198:web:4aa2cd1a908e059b1d72ff",
  measurementId: "G-DNGK4D0Q9V",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

export default firebase;
export { app, auth };
