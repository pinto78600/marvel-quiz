import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {

    const [btn, setBtn] = useState(false);

    const refWolverine = useRef(null);

    useEffect(() => {
            refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 1000)
    }, [])

    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg");
    }
    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg");
    }

    const clearRightImg = () => {
        refWolverine.current.classList.remove("rightImg");

    }

    const clearLeftImg = () => {
        refWolverine.current.classList.remove("leftImg");

    }

    const displayBtn = btn && (
        <>
            <div onMouseOut={clearLeftImg} onMouseOver={setLeftImg} className="leftBox">
                <Link to="/signup" ><button className="btn-welcome">Inscription</button></Link>
            </div>
            <div onMouseOut={clearRightImg} onMouseOver={setRightImg} className="rightBox">
                <Link to="/login" ><button className="btn-welcome">Connexion</button></Link>
            </div>
        </>
    )

    
    return (
       <main ref={refWolverine} className='welcomePage'>
         {displayBtn}
       </main>
    )
}

export default Landing;