import React, { useState, useContext, useEffect } from 'react';
import Loader from '../Loader/Loader';
import Logout from '../Logout/Logout';
import Quiz from '../Quiz/Quiz';
import { FirebaseContext } from '../Firebase/Index';

import './Welcome.css';


const Welcome = props => {

    const [userSession, setUserSession ] = useState(null);
    const [userData, setUserData ] = useState({})
    const firebase = useContext(FirebaseContext);
    
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })
        
        if(!!userSession){
            firebase.user(userSession.uid)
            .get()
            .then( doc => {
                if(doc && doc.exists) {
                    const myData = doc.data()
                    setUserData(myData);
                }
            })
            .catch( error => {
                
            })
        }
        return () => {
            listener()
        }
    }, [userSession])
        

    return userSession === null ? (
        <>
            <Loader 
                    loadingMsg={'Authentification...'}
                    styling={{textAlign : 'center', color: '#FFFFFF'}}
                />
        </>
    ) : (
        <div className="quiz-bg" >
            <div className="container">
                <Logout />
                <Quiz userData={userData} uid={userSession.uid} history={props.history} />
            </div>
        </div>   
    )
}

export default Welcome;