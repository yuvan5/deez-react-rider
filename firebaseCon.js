// database/firebaseDb.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firestore from 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBiGYS4QOhsiZ36aBPhFejbZLBCyZr7sJo",
    authDomain: "deez-doughnut-assignment.firebaseapp.com",
    projectId: "deez-doughnut-assignment",
    storageBucket: "deez-doughnut-assignment.appspot.com",
    messagingSenderId: "121880855860",
    appId: "1:121880855860:web:c17e666b401b52f7ed9161"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;