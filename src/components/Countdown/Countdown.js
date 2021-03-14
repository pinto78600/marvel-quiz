import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Loader from '../Loader/Loader';

import './Countdown.css';



const Countdown = ({countdown, setQuizEnd }) => {


    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          setTimeout(() => {
            setQuizEnd(true)
          }, 500) 
          return  <div>Trop tard!</div> ;
          
        }
      
        return (
          <div >
            <div className="value">{remainingTime}</div>
          </div>
        );
      };

    
    return(
        countdown !== 0 ? 
        (
            <div className='timer-wrapper'>
                <CountdownCircleTimer
                isPlaying
                duration={countdown}
                colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                ]}
                size={120}
                >
                {renderTime}
                </CountdownCircleTimer>
            </div>
        )
        :
        (
            <Loader />
        )
    )

  
}

export default Countdown;