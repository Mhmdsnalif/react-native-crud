//database 
//import * as firebase from 'firebase';
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBOaI02y_05ycDLh2la6s2H30U7wiJLt28",

  authDomain: "prak-firebase-189af.firebaseapp.com",

  projectId: "prak-firebase-189af",

  storageBucket: "prak-firebase-189af.appspot.com",

  messagingSenderId: "966601579276",

  appId: "1:966601579276:web:519d59e2fa78bcf6138729",

  measurementId: "G-H32712SFPF"

};
firebase.initializeApp(firebaseConfig);
export default firebase;