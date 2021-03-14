import React, { useEffect, useState , useContext} from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase/Index';
import { verifyCode } from '../errorMessage/errorMessage'



const Login = (props) => {

    const firebase = useContext(FirebaseContext);
    const test = useContext(verifyCode);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => { 
        if(password.length > 5 && email !== ''){
            setBtn(true)
        }else(
            setBtn(false)
        )
    }, [password, email, btn])

    const handleSubmit = e => {
        e.preventDefault();
        firebase.loginUser(email, password)
        .then(user => {
            setEmail('');
            setPassword('');
            props.history.push('/welcome');
        })
        .catch(error => {
            let errorMessage = verifyCode(error.code)

            setError(errorMessage);
            setEmail('');
            setPassword('');
        })
    }

     //gestion erreurs
     const errorMsg = error !== '' && <span>
     {  error}
    </span>

    return(
        <div className="signUpLoginBox">
           <div className="slContainer">
           <div className="formBoxLeftLogin" >

            </div>
            <div className="formBoxRight" >
                <div className="formContent">

                    {errorMsg}

                    <h2>Connexion</h2>
                    <form onSubmit={handleSubmit}>
                       
                        <div className='inputBox'>
                            <input onChange={ e => {setEmail(e.target.value)}} value={email} type='email'  autoComplete='off' required/>
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className='inputBox'>
                            <input onChange={ e => {setPassword(e.target.value)}} value={password} type='password'  required/>
                            <label htmlFor='password'>Mot de passe</label>
                        </div>

                        {btn ? <button>Connexion</button> : <button disabled>Connexion</button> }
                       
                    </form>
                    <div className="linkContainer" >
                        <Link className="simpleLink" to="/signup">Pas encore inscrit?</Link>
                        <br />
                        <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié?</Link>
                    </div>
                </div>
            </div>
           </div>
        </div>   
    )

}

export default Login;