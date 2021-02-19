import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase/Index';


const ForgetPassword = props => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const firebase = useContext(FirebaseContext);


    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(email)
        .then(() => {
            console.log(email);
            setError(null);
            setSuccess(`Un nouveau mot de passe vous a été envoyé sur ${email}`);
            setEmail('');

            setTimeout(() => {
                props.history.push('/login');
            }, 4000)
        })
        .catch(error => {
            setError(error);
            setEmail('');
        })
    };

    const disabled = email === ""


    return(
        <div className="signUpLoginBox">
        <div className="slContainer">
        <div className="formBoxLeftForget" >

         </div>
         <div className="formBoxRight" >
             <div className="formContent">

                {success && <span style={{
                    border : "1px solid green",
                    background : 'green',
                    color : '#ffffff'
                }}>
                    {success}
                    
                </span>}

                {error && <span>{error.message}</span>}

                 <h2>Mot de passe oublié?</h2>
                 <form onSubmit={handleSubmit}>
                    
                     <div className='inputBox'>
                         <input onChange={ e => {setEmail(e.target.value)}} value={email} type='email'  autoComplete='off' required/>
                         <label htmlFor='email'>Email</label>
                     </div>

                     <button disabled={disabled}>Récuperer</button>

                    
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

export default ForgetPassword;