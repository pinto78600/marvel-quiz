import React from 'react';

import './ProgressBar.css'

const ProgressBar = ({idQuestion, maxQuestions}) => {

    return(
        <>
        <div className='percentage'>
          <div className="progressPercent">Question: {idQuestion + 1}/{maxQuestions}</div>
          <div className="progressPercent">Progression: {idQuestion}0%</div>
        </div>
        <div className='progressBar'>
            <div className="progressBarChange"  style={{ width : `${idQuestion}0%`}} ></div>
        </div>
        </>
    )
}

export default ProgressBar;