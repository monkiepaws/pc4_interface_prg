import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyD7v1f2mYklWfp7rtQH77absw7GZnrhC_k",
    authDomain: "friends-a7d9f.firebaseapp.com",
    databaseURL: "https://friends-a7d9f.firebaseio.com",
    projectId: "friends-a7d9f",
    storageBucket: "friends-a7d9f.appspot.com",
    messagingSenderId: "170773712910"
};
firebase.initializeApp(config);
export default firebase;