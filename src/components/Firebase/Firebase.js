import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDOnnVuTkjnAXua0wUbeXbMD8QnCMIcSpk",
    authDomain: "marvel-quiz-c9b50.firebaseapp.com",
    projectId: "marvel-quiz-c9b50",
    storageBucket: "marvel-quiz-c9b50.appspot.com",
    messagingSenderId: "323032880190",
    appId: "1:323032880190:web:a92f9bb59372dd46a56d6f"
  };

class Firebase {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db= app.firestore();
    }
    //inscription
    signupUser = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);
    
    //connexion
    loginUser = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);
    

    //deconnexion
    signoutUser = () => this.auth.signOut();

    //Récupérer le mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

   //firestore
    user = uid =>  this.db.doc(`users/${uid}`);

}

export default Firebase;