import firebase from 'firebase'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Connect To Firebase Database

const firebaseConfig = {
  apiKey: "AIzaSyBBgSA8eB3QFYpDBQFPVA7M6tkSN72ZXag",
  authDomain: "parking-app-2ba2c.firebaseapp.com",
  projectId: "parking-app-2ba2c",
  storageBucket: "parking-app-2ba2c.appspot.com",
  messagingSenderId: "163975831928",
  appId: "1:163975831928:web:e507fe2ae03c746811a88d",
  measurementId: "G-1EQJCVHW7F"
};


// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire; 

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);