import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { FaLinkedin } from 'react-icons/fa'


import './Footer.css'


const Footer = () => {
    
    const [displayModal, setDisplayModal] = useState(false);

    const hideModal = () => {
        setDisplayModal(false)
    }

    const displayRules = () => {
        setDisplayModal(true);
    
    }

    const textRules = ` Quiz soccer comprend 10 niveaux, chaque niveau contient 10 questions. 
    Il faut un minimum de taux de réussite pour voir passer au niveau supérieur. 
    cette limite change au fur et à mesure qu'on progresse de niveau, par exemple le premier niveau il faut 5 bonnes réponses, le niveau 6 il faut minimum 8 bonnes réponses et 10 à partir du niveau 8.  
    Le temps est limité, le temps disponible change en fonction du niveau.`

    const textHosting = `Le site est hébergé par Firebase. 
    La connexion utilisateur et la base de données est également gérée par cette dernière. Il a été conçu avec Javascript et React JS.`

    const rules = 
        <>
            <div className='modalHeader'>
                <h2>À propos</h2>
            </div>
                <div className='modalBody' >
                    <div className="comicDetails">
                        <h3>Le principe de Quiz Soccer</h3>
                            <p>{textRules}</p>
                        <h3>Hébergement</h3>
                            <p>{textHosting}</p>
                    </div>

                </div>
                <div className='modalFooter'>
                    <button onClick={hideModal}>
                        Fermer
                    </button>

                </div>
        </>;
   
   return (
        <footer>
            <Modal showModal={displayModal}>
                {rules}
            </Modal>
            <div className="footer-container">
                <a  href='https://www.linkedin.com/in/stephane-pinto/' target="_blank" rel="noreferrer" >
                    <FaLinkedin size='40px' color='blue'/>
                </a>
                <p>Projet réalisé par Stéphane - 2O21</p>
                <button className='buttonModalRules' onClick={displayRules}>
                    À propos
                </button>
                <p>Les images sont prises sur pngegg.com</p>
                
            </div>
        </footer>
    )
}

export default Footer;