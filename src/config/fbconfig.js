import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyCsnVCsCNHCH-RrhsfOg4UBYO1CInivtIU",
    authDomain: "f-todo-213af.firebaseapp.com",
    databaseURL: "https://f-todo-213af.firebaseio.com",
    projectId: "f-todo-213af",
    storageBucket: "f-todo-213af.appspot.com",
    messagingSenderId: "393154654871",
    appId: "1:393154654871:web:e1818d5e6ef697916e6fd2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.storage();

export default firebase;
