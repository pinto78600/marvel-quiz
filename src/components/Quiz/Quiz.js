import React, { useEffect, useRef, useState, useContext } from 'react';
import Levels from '../Levels/Levels';
import { FirebaseContext } from '../Firebase/Index';

import ProgressBar from '../ProgressBar/ProgressBar';
import { quizSoccer } from '../QuizSoccer/QuizSoccer';
import Questions from '../Questions/Questions';
import QuizOver from '../QuizOver/QuizOver';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Countdown from '../Countdown/Countdown';



toast.configure();



const Quiz = props => {
    
    const [storedQuestion, setStoredQuestion] = useState();
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [idQuestion, setIdQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [quizEnd, setQuizEnd] = useState(false);
    const [lastQuestion, setLastQuestion]= useState(false);
    const [quizLevel, setQuizLevel] = useState(0);
    const [percent, setPercent] =  useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [arrayScore, setArrayScore] = useState([]);
    const [toastPseudo, setToastPseudo] = useState(true);
    const [countdown, setCountdown] = useState(0);
    const [averageGrade, setAverageGrade] = useState()


    const levelNames = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    const firebase = useContext(FirebaseContext);
    
    const maxQuestions = 10;

    const pseudo = props.userData.pseudo;
    const sid = props.uid;

    let storeInitialArray = useRef();
    
    const loadQuestion = level => {
        setCountdown(quizSoccer[0].quizz[level][0].timer)
        setAverageGrade(quizSoccer[0].quizz[level][0].average)
        const fetchedArrayQuiz = quizSoccer[0].quizz[level];
        if (fetchedArrayQuiz.length >= maxQuestions) {
            storeInitialArray.current = fetchedArrayQuiz
            const newArray = fetchedArrayQuiz.map( ({ answer, ...keepRest }) => keepRest);
            
            setStoredQuestion(newArray);
        }else {
            console.log("Pas assez de questions");
        }
    }

    const setRanking = () => {
        firebase.score(sid)
        .get()
        .then(sUser  => {
            if(sUser && sUser.exists){
                const scoreUser = sUser.data().totalScore;
                if(totalScore > scoreUser ){
                    firebase.score(sid).set({
                        pseudo,
                        totalScore,
                        level : quizLevel + 1
                    });
                }
            }
    })

}

const getRanking = () => {

    firebase.scoreAll().get().then((querySnapshot) => { 
        const tempDoc = []
        querySnapshot.forEach( doc  => {
            const getPseudoData = doc.data().pseudo;
            const getTotalScore = doc.data().totalScore;
            const getLevel = doc.data().level;
            tempDoc.push({pseudo : getPseudoData, score : getTotalScore, level : getLevel })
            tempDoc.sort((a, b) =>  b.score - a.score);
            setArrayScore(tempDoc)
            
        });
        
    }
    )
    .catch(err => {
        console.log(err);
    })
}


const welcomeMsg = pseudo => {
    
    toast.warn(`C'est parti ${pseudo} !`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        });
    }
    
    useEffect(() => {
        loadQuestion(levelNames[quizLevel]);
        setRanking()
        getRanking()
        
            if(pseudo && toastPseudo) {
                setToastPseudo(false)
                welcomeMsg(pseudo)
            }
    
    }, [pseudo, totalScore]);
    
    const nextQuestion = () => {
        if(idQuestion === maxQuestions - 1){
            setQuizEnd(true);
        }else{
            setIdQuestion(idQuestion + 1)
        }
        const goodAnwser = storeInitialArray.current[idQuestion].answer;
        if(userAnswer === goodAnwser){
            setScore( score + 1);
            setTotalScore( totalScore + 1);
            toast.success(`Bonne réponse ${props.userData.pseudo} !`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }else{
            toast.error('Mauvaise réponse!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }
    }
    
    const usePrevious =(data) =>{
        const ref = useRef()
        useEffect(()=>{
            ref.current = data
        }, [data])
        return ref.current
    }
    
    let prevDataQuestion = usePrevious(storedQuestion);
    let prevDataIdQuestion = usePrevious(idQuestion);
    let prevDataQuizEnd = usePrevious(quizEnd);
    
    
    useEffect(() => {
        
        if (storedQuestion !== prevDataQuestion){
            setQuestion(storedQuestion[idQuestion].question);
            setOptions(storedQuestion[idQuestion].options);
            
        }
        
        if(!prevDataIdQuestion){
            prevDataIdQuestion = 0
        }
        if(quizEnd !== prevDataQuizEnd){
            const gradePercent = getPercent(maxQuestions, score)
            const gradeLimit = getGradeLimit(averageGrade)
            gameOver(gradePercent, gradeLimit)
        }
        
        if(idQuestion !== prevDataIdQuestion){
            setQuestion(storedQuestion[idQuestion].question);
            setOptions(storedQuestion[idQuestion].options);
            setUserAnswer(null);
            setBtnDisabled(true);
            
        }
        
        idQuestion < maxQuestions - 1 ? setLastQuestion(false) : setLastQuestion(true) ;
        
    }, [storedQuestion, idQuestion, quizEnd])

    
    const getPercent = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    const getGradeLimit = average => average * 10;
    
    const gameOver = (gradePercent, gradeLimit) => {

        if(gradePercent >= gradeLimit){
            setQuizLevel(quizLevel + 1);
            setPercent(gradePercent);

        }else{
            setPercent(gradePercent);
        }
    }

    const loadLevelQuestions = params => {
        
        setQuizLevel(params)
        loadQuestion(levelNames[params])
        setQuestion(null)
        setIdQuestion(0)
        setScore(0)
        setUserAnswer(null)
        setBtnDisabled(true)
        setQuizEnd(false)
        setLastQuestion(false)
        setPercent(0)

    }
    
    return(
        quizEnd ? (
            <QuizOver 
                reference={storeInitialArray}
                levelNames={levelNames}
                score={score}
                maxQuestions={maxQuestions}
                quizLevel={quizLevel}
                percent={percent}
                loadLevelQuestions={loadLevelQuestions}
                arrayScore={arrayScore}
                setTotalScore={setTotalScore}
                pseudo={pseudo}
                averageGrade={averageGrade}
            />
            )
            :
            <>
            <Levels 
                levelNames={levelNames}
                quizLevel={quizLevel}
            />
            <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
            <Countdown countdown={countdown}  setQuizEnd={setQuizEnd}/>
            <Questions 
                question={question} options={options} userAnswer={userAnswer} setUserAnswer={setUserAnswer}
                btnDisabled={btnDisabled} setBtnDisabled={setBtnDisabled} nextQuestion={nextQuestion}
                lastQuestion={lastQuestion}
            />
        </>
    )
}

export default React.memo(Quiz);