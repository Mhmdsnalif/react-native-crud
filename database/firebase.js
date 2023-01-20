//database 
//import * as firebase from 'firebase';
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDpOi4l_HkfaprtLr54cN82GpRAb9Auqm4",
  authDomain: "tubes-ppb-8db3f.firebaseapp.com",
  projectId: "tubes-ppb-8db3f",
  storageBucket: "tubes-ppb-8db3f.appspot.com",
  messagingSenderId: "990768915226",
  appId: "1:990768915226:web:aa6d102150f804cbb842a3",
  measurementId: "G-DVCF3WJXYH"
  };
  
  export default !firebase.apps.length ? 
  firebase.initializeApp(firebaseConfig) : firebase.app();
  