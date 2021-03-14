import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const Questions = props => {

    const submitAnswer = selectedAnswer => {
       
           props.setBtnDisabled(false);
           props.setUserAnswer(selectedAnswer);
       
    }

    const displayAnswers = props.options.map( (option, index) => {
        return(
            <p key={index} className={`answerOptions ${props.userAnswer === option ? 'selected' : null}`} onClick={() => { submitAnswer(option)}}>
                  <FaChevronRight />  {option}
            </p>
        )
    })

    const btnLastQuestion = props.lastQuestion ? 'Terminer' : 'Suivant';

    return(
        <div >
            <h2>{props.question}</h2>
            {displayAnswers}
            <button 
                onClick={props.nextQuestion}
                className="btnSubmit" 
                disabled={props.btnDisabled}>
                {btnLastQuestion}
            </button>
        </div>
    )
}

export default Questions;