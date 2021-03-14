import React from 'react';
import chan from '../../images/jacky.png';

import './ErrorPage.css'

const ErrorPage = () => {

    const centerH2 = {
        textAlign: 'center',
        marginTop : '50px'
    }

    const centerImg = {
        display: 'block',
        margin: "20px auto"
    }
    return(
        <div className="quiz-bg">
           <div className="container">
                <h2 style={centerH2} >Oups cette page n'existe pas</h2>
                <img src={chan} style={centerImg} alt='image' />
           </div>
        </div>   
    )

}

export default ErrorPage;