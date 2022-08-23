import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyA1UK8amEebSeV-hNt7RE_n0bd4PBncLQs",
  authDomain: "image-repo-537f8.firebaseapp.com",
  projectId: "image-repo-537f8",
  databaseURL: "gs://image-repo-537f8.appspot.com",
  storageBucket: "image-repo-537f8.appspot.com",
  messagingSenderId: "375285590060",
  appId: "1:375285590060:web:566502ac475b45d64ac989",
  measurementId: "G-9F5LDMHHKX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fbStorage = firebase.storage();
const fbFireStore = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp();


export { fbStorage, fbFireStore, timeStamp };  