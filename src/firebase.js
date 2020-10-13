import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAOnHImrYbHCPObiJYNQpa1Cnf7ftzyE8w",
  authDomain: "vivablee-dev.firebaseapp.com",
  databaseURL: "https://vivablee-dev.firebaseio.com",
  projectId: "vivablee-dev",
  storageBucket: "vivablee-dev.appspot.com",
  messagingSenderId: "959237797126",
  appId: "1:959237797126:web:9c183ce0da34b3ac24da87",
  measurementId: "G-M520VWPWS5"
});

var db = firebaseApp.firestore();

export { db };
