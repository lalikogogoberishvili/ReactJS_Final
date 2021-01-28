import firebase from 'firebase';
  var firebaseConfig = {
    apiKey: "AIzaSyCbhH1OtXgJbi-8nF-dq6VfwG2z7hcXJ5s",
    authDomain: "clean-pen-238213.firebaseapp.com",
    projectId: "clean-pen-238213",
    storageBucket: "clean-pen-238213.appspot.com",
    messagingSenderId: "759625137230",
    appId: "1:759625137230:web:3cf6227008cc784e8b171f",
    measurementId: "G-9X601DLXBF"
  };
 
  const fire=firebase.initializeApp(firebaseConfig);
  export default fire;
