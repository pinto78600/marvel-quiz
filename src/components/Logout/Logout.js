import React, { useEffect, useState, useContext } from 'react';
import { GiExitDoor } from 'react-icons/gi';
import { FirebaseContext } from '../Firebase/Index';
import ReactTooltip from 'react-tooltip';

import './Logout.css';


const Logout = () => {

    const [checked, setChecked ] = useState(false);
    const firebase = useContext(FirebaseContext);


    useEffect(() => {
        if(checked){
            firebase.signoutUser();
        }
    },[checked, firebase] )

    const handleChange = e => {
        setChecked(e.target.checked)
    }
 
    return(
        <div className='logoutContainer'>
            <label className='switch'>
                <input onChange={handleChange} type='checkbox' checked={checked} />
            <GiExitDoor className='exit' cursor='pointer' size='50px' data-tip="Déconnexion"><span data-tip="Déconnexion" ></span></GiExitDoor> 
            </label>
            <ReactTooltip place='left' effect='solid'/>
        </div>
    )
}

export default Logout;