import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase/Index';
import { verifyCode } from '../errorMessage/errorMessage'


const Signup = (props) => {

    const firebase = useContext(FirebaseContext);

   
    const data = {
        pseudo : '',
        email : '',
        password : '',
        confirmPassword : ''
    };
    
    const [loginData, setLoginData ] = useState(data);
    const [error, setError] = useState('');
    const [ pseudoUsed, setPseudoUsed ] = useState(false);
    
    const { pseudo, email, password, confirmPassword } = loginData
    const messagePseudoUsed = 'Ce pseudo est déjà utilisé.'
    const handleChange = e => {
        setLoginData({...loginData, [e.target.id] : e.target.value})
    };

    const getPseudoUsed = name  => {
        firebase.scoreAll().get().then( test => {
            const tempDoc = []
                test.forEach( n => {
                    tempDoc.push({pseu : n.data().pseudo })
                  if(tempDoc.find( arrayName => arrayName.pseu === name)){
                      setPseudoUsed(true);
                  }else{
                    setPseudoUsed(false)
                  }
                })
            })
    }

    const createFirestoreUser = (pseudo, sid) => {
        firebase.score(sid).set({
            pseudo,
            totalScore : 0,
            level : 1
        });
    }

    useEffect(() => {
        getPseudoUsed(pseudo);
    },[])
    
    const handleSubmit = e => {
        const { pseudo, email, password } = loginData
        e.preventDefault();
        if(!pseudoUsed){
            firebase.signupUser(email, password)
            .then(authUser => {
                createFirestoreUser(pseudo, authUser.user.uid)
                return firebase.user(authUser.user.uid).set({
                    pseudo,
                    email
                });
            })
            .then(() => {
                setLoginData({...data});
                props.history.push('/welcome');
            })
            .catch(error => {
                let errorMessage = verifyCode(error.code)
    
                setError(errorMessage);
                setLoginData({...data});
            })
        }else{
            setError(messagePseudoUsed)
            setLoginData({...data})
        }
    };

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ? <button disabled>Inscription</button> : <button>Inscription</button>

    //gestion erreurs
    const errorMsg = error !== '' && <span>
        {error}
    </span>

    return(
        <div className="signUpLoginBox">
           <div className="slContainer">
                <div className="formBoxLeftSignup" >

                </div>
                <div className="formBoxRight" >
                    <div className="formContent">

                        {errorMsg}

                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit} >
                            <div className='inputBox'>
                                <input onChange={handleChange} value={pseudo} type='text' id='pseudo' autoComplete='off' required/>
                                <label htmlFor='pseudo'>Pseudo</label>
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={email} type='email' id='email' autoComplete='off' required/>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={password} type='password' id='password'  required/>
                                <label htmlFor='password'>Mot de passe</label>
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={confirmPassword} type='password' id='confirmPassword'  required/>
                                <label htmlFor='conformPassword'>Confirmer le mot de passe</label>
                            </div>
                            {btn}
                        </form>
                        <div className="linkContainer" >
                            <Link className="simpleLink" to="/login">Déja inscrit?</Link>
                        </div>
                    </div>
                </div>
           </div>
        </div>   
    )

}

export default Signup;