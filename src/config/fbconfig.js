import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_API_authDomain,
    databaseURL: process.env.REACT_APP_API_databaseURL,
    projectId: "f-todo-213af",
    storageBucket: process.env.REACT_APP_API_storageBucket,
    messagingSenderId: process.env.REACT_APP_API_messagingSenderId,
    appId: process.env.REACT_APP_API_appId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.storage();

export default firebase;