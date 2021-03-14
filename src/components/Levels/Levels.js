import React, { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal'

import './Levels.css';

const Levels = ({ levelNames, quizLevel }) => {

    const [level, setLevel ] = useState([]);

    useEffect(() => {
        const stepNames = levelNames.map( () => ({title : '' })); 
        setLevel(stepNames) 
    }, [levelNames])
    

    return(
        <div className='levelsContainer' style={{background : 'transparent'}} >
            <Stepper
                steps ={level}
                activeStep={ quizLevel }
                circleTop={0}
                activeTitleColor={'#d31017'}
                activeColor={'#d31017'}
                completeTitleColor={'#E0E0E0'}
                completeColor={'#E0E0E0'}
                completeBarColor={'#E0E0E0'}
                barStyle={'dashed'}
                size={30}
                circleFontSize={22}
                completed={false}
            />
        </div>
    )
}

export default React.memo(Levels);