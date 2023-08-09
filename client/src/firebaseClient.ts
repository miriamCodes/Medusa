import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "*removed API key*",
    authDomain: "medusa",
    projectId: "medusa",
    
    messagingSenderId: "",
    
};

console.log("Initializing Firebase");
firebase.initializeApp(firebaseConfig);



export default firebase;