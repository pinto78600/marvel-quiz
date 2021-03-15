import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GiTrophyCup } from 'react-icons/gi';
import mbappe from '../../images/mbappe.png';
import ney from '../../images/neymarFall.png';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';



import './QuizOver.css';

const QuizOver = props => {
    
    const { 
        levelNames, 
        score, 
        maxQuestions, 
        quizLevel, 
        percent, 
        reference, 
        loadLevelQuestions,
        arrayScore,
        setTotalScore,
        pseudo,
        averageGrade } = props

    const API_PUBLIC_KEY = process.env.REACT_APP_FOOTBALL_API_KEY;
                    
    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [footballData, setfootballData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [typeData, setTypeData ]= useState('');
    const [displayRanking, setDisplayRanking] = useState(false);


    const dateNow = 2021;
    
    useEffect(() => {
        setAsked(reference.current)
            
        if(localStorage.getItem('soccerStrorageDate')){
            const date = localStorage.getItem('soccerStrorageDate');
            checkDataAge(date);
        }
        if(score < averageGrade){
            setTotalScore(0)
        }

        setTimeout(() => {
            setDisplayRanking(true)
        }, 2000)
    
    }, [reference.current, footballData, arrayScore]);

    const checkDataAge = date => {
        const today = Date.now();
        const timeDif = today - date;
        const daysDif = timeDif / (1000 * 3600 * 24);

        if(daysDif >= 15){
            localStorage.clear();
            localStorage.setItem('soccerStrorageDate', Date.now());
        }
    }
    

    const showModal = (id, type, season) => {
        setOpenModal(true);
        setTypeData(type);
        
        if(localStorage.getItem(id)){
            
            setfootballData(JSON.parse(localStorage.getItem(id)))
            setLoadingData(false)

        }else{
            axios(`https://v3.football.api-sports.io/${type}?id=${id}${ type === 'players' ? `&season=${season}` : '' }`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": API_PUBLIC_KEY
                }
            })
            .then(res => {
                setfootballData(res.data)

                if(!localStorage.getItem('marvelStrorageDate')){
                    localStorage.setItem('marvelStrorageDate', Date.now());
                }
                if(res.data.response.length !== 0){
                setLoadingData(false);
                localStorage.setItem(id, JSON.stringify(res.data));
                }
            })
            .catch(err => {
                console.log(err);
                setLoadingData(true);
            })
            
        }
        
    }
 
    const hideModal = () => {
        setOpenModal(false)
        setLoadingData(true)
    }
    
    const loaderApiFootball =  
        <>
            <div className='modalHeader'>
                <h2>Attente de API sport...</h2>
            </div>
            <div className='modalBody'>
                <Loader/>
                <div className='modalFooter'>
                    <button className="modalBtn" onClick={hideModal}>Fermer</button>
                </div>
            </div>
        </>
    
    const decision = score >= averageGrade ? (

        <>
            
            {
                quizLevel < levelNames.length ?
                (
                    <>  
                        <div className="stepsBtnContainer">
                            <div>
                                <img src={mbappe} />
                                <p className="successMsg">Bravo, passez au niveau {quizLevel + 1} !</p>

                            </div>
                            <button 
                                onClick={() =>loadLevelQuestions(quizLevel)}
                                className="btnResult success">
                                    Niveau Suivant
                            </button>
                        </div>
                    </>
                        
                )
                :
                (
                    <>
                        <div className='trophyEnd'>
                            <h1>Félicitation !!!</h1>
                            <p>{pseudo}</p>
                        </div>
                        <div className="stepsBtnContainer">

                            <p className="successMsg"><GiTrophyCup size='50px'/> Bravo, vous êtes un expert !!</p>
                            <button 
                                onClick={() =>loadLevelQuestions(0)}
                                className="btnResult gameOver">
                                    Accueil
                            </button>
                        </div>
                    </>
                )
            }
            <div className="percentage" >
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </>
    )
    :
    (
        <>
             <div className="stepsBtnContainer">
                 <div>
                    <img src={ney} />
                    <p className="failureMsg">Vous avez échoué !</p>
                 </div>
                 <button 
                    onClick={() =>loadLevelQuestions(0)}
                    className="btnResult gameOver">
                        Accueil
                </button>
            </div>
            <div className="percentage" >
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </>
    )

    const questionsAnswer = score >= averageGrade ? (
        asked.map(question => {
            return(
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button 
                            onClick={() => showModal(question.heroId, question.type, question.season)}
                            className="btnInfo">Infos
                        </button>
                    </td>
                </tr>
            )
        })
    )
    :
    (
        <tr>
            <td colSpan="3" style={{textAlign : 'center', color: 'red'}}>
                    Votre score est de {score} pts { quizLevel !== 9 ? `et pour passer au niveau ${quizLevel + 1}` : '' } il faut un réussir au minimum {averageGrade} pts    
            </td>
        </tr>
    )
    const capitalizeFirstLetter = type => {
        return type.charAt(0).toUpperCase() + type.slice(1)
    }
    
    const arrayScoreTotal = !displayRanking && !arrayScore ? (
        
        <tr>
        <td colSpan="3">
            <Loader 
                loadingMsg={'Attente Firestore...'}
                styling={{textAlign : 'center', color: 'red'}}
            />
        </td>
    </tr>  
    
    )
    :
    (
        arrayScore.map( (scr, index) => {
            return( 
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{capitalizeFirstLetter(scr.pseudo)}</td>
                <td>{scr.level}</td>
                <td>{scr.score}</td>
            </tr>
            )
        })
    )

    let resultModalData = '';
    switch (typeData) {
        case 'players':
            if(!loadingData){
              const date = footballData.response[0].player.birth.date 
            
            resultModalData = 
                <>
                    <div className='modalHeader'>
                        <h2>{footballData.response[0].player.name}</h2>
                    </div>
                    <div className='modalBody'>
                        <div className="comicImage">
                            <img 
                                src={footballData.response[0].player.photo} 
                                alt={footballData.response[0].player.name} 
                            />
                        </div>
                        <div className="comicDetails">
                            <h3>Description</h3>
                            <p>
                                Il est né le  { footballData.response[0].player.birth.date} ( { dateNow - date.substr(0,4)} ans) a {footballData.response[0].player.birth.place}, {footballData.response[0].player.birth.country}.
                                
                            </p>
                            <p>Nationalité : {footballData.response[0].player.nationality}</p>
                            <p>Poid : {footballData.response[0].player.weight}</p>
                            <p>Taille : {footballData.response[0].player.height}</p>

                        </div>
                    </div>
                </>
            
            }else{
                <>
                    {loaderApiFootball}
                </>
            }
            break;
            case 'teams':

                resultModalData = 
                !loadingData  ? (
                <>
                        <div className='modalHeader'>
                        <h2>{footballData.response[0].team.name}</h2>
                    </div>
                    <div className='modalBody'>
                        <div className="comicImage">
                            <img 
                                src={footballData.response[0].team.logo} 
                                alt={footballData.response[0].team.name} 
                            />
                        </div>
                        <div className="comicDetails">
                            <h3>Description</h3>
                            <p>Fonder: {footballData.response[0].team.founded}</p>
                            <p>Pays : {footballData.response[0].team.country}</p>
                            <p>Stade : {footballData.response[0].venue.name}</p>
    
                        </div>
                    </div>
                </>
                )
                :
                (
                    loaderApiFootball
                )
            break;
            case 'coachs':

                if(!loadingData){
                    let arrayCareer = footballData.response[0].career

                    resultModalData = 
                   
                        <>
                            <div className='modalHeader'>
                                <h2>{footballData.response[0].name}</h2>
                            </div>
                            <div className='modalBody'>
                                <div className="comicImage">
                                    <img 
                                        src={footballData.response[0].team.logo} 
                                        alt={footballData.response[0].team.name} 
                                    />
                                </div>
                                <div className="comicDetails">
                                    <h3>Description</h3>
                                    <p>Il est né le : {footballData.response[0].birth.date} ( {footballData.response[0].age} ans)</p>
                                    <p>Lieu naissance : {footballData.response[0].birth.place} ({footballData.response[0].birth.country})</p>
                                    <p>Nationalité : {footballData.response[0].nationality}</p>
                                    <div>
                                        Carrière : { arrayCareer.map((team, index) => {
                                            return(
                                                <p key={index} >{team.team.name}({team.start})</p>
    
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            </div>
                        </>
                    
                }else{
                    <>
                        {loaderApiFootball}
                    </>
                }
                
                break;
                case 'venues':

                resultModalData = 
                !loadingData  ? (
                    <>
                        <div className='modalHeader'>
                            <h2>{footballData.response[0].name}</h2>
                        </div>
                        <div className='modalBody'>
                            <div className="comicImage">
                                <img 
                                    src={footballData.response[0].image} 
                                    alt={footballData.response[0].name} 
                                />
                            </div>
                            <div className="comicDetails">
                                <h3>Description</h3>
                                <p>Lieu: {footballData.response[0].address}, {footballData.response[0].country}</p>
                                <p>Capacité : {footballData.response[0].capacity} places</p>
                            </div>
                        </div>
                    </>
                )
                :
                (
                    loaderApiFootball
                )
                break;
        default:
            break;
    }
   


    const resultModal = !loadingData ? 
    (
        <>

            {resultModalData}

            <div className='modalFooter'>
                <button className="modalBtn" onClick={hideModal}>Fermer</button>
            </div>
        </>   
    )
    :
    (
        loaderApiFootball
    )
    
    return(
        <>

          {decision}
           
            <hr />
            <p>Les réponses aux questions posées:</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionsAnswer}
                    </tbody>
                </table>
            </div>
            <Modal showModal={openModal}>
                {resultModal}
            </Modal>
            <div className='headerRanking'>
                <h2>Classement</h2>
            </div>
                <div className="answerContainer">
                    <table className="answers">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Pseudo</th>
                                <th>Niveau</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrayScoreTotal}
                        </tbody>
                    </table>
                </div>
        </>
    )
}

export default React.memo(QuizOver);