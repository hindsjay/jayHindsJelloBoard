import firebase from 'firebase';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvmCIhenNay49FjRf5eq0z08sTop651uQ",
  authDomain: "jello-database.firebaseapp.com",
  databaseURL: "https://jello-database.firebaseio.com",
  projectId: "jello-database",
  storageBucket: "jello-database.appspot.com",
  messagingSenderId: "954320055794",
  appId: "1:954320055794:web:006031744c1a0e4957cf6b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;