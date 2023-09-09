import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import Levels from '../Levels'
import ProgressBar from '../ProgressBar';
import {quizMarvel} from '../quizMarvel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';


function Quizz(props) {


    const [debutant,setDebutant] = useState({
    levelNames: ["debutant","confirme","expert"],
    quizLevel:0,
    maxQuestion:10,
    storeQuestion:[],
    question: null,
    options:[],
    idQuestion:0,
    btnDisabled:true,
    userAnswer:null,
    score:0,
    quizOver:false

    })

    const storedDataRef = useRef(null)
    
   
    

    const loadQuestion = (level)=>{
        const fetchArrayQuiz = quizMarvel[0].quizz[level]


        if(fetchArrayQuiz.length >= debutant.maxQuestion){


            storedDataRef.current = fetchArrayQuiz


            const newArray = fetchArrayQuiz.map(({answer,...keepRest})=>{return keepRest})
            setDebutant({...debutant,storeQuestion:newArray,quizOver:false,idQuestion:0})

        
             
        }else{

        }

        
    }


    const showMessage = (pseudo)=>{
       toast.warn('BONJOUR', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

           
    }
  
    


    useEffect(()=>{
        loadQuestion(debutant.levelNames[debutant.quizLevel])
        if(props.data.pseudo){
            showMessage(props.data.pseudo)
           }
 
    },[])

    useEffect(()=>{
     
        
        debutant.storeQuestion[debutant.idQuestion] !== undefined && setDebutant({...debutant,question:debutant.storeQuestion[debutant.idQuestion].question,options:debutant.storeQuestion[debutant.idQuestion].options})
 
       
     
            
        
    },[debutant.storeQuestion,debutant.idQuestion])


    const handleClick = (option)=>{
        setDebutant({...debutant,userAnswer:option,btnDisabled:false})
        
    }
    
    const nextQuestion = ()=>{


        const goodAnswer =  storedDataRef.current[debutant.idQuestion].answer

       if(debutant.userAnswer == goodAnswer){
        toast.success('🦄 GOOD', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setDebutant({...debutant,score: debutant.score+=1})
       }else{
        toast.error('🦄 BAD', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
       }

       

        if(debutant.idQuestion == debutant.maxQuestion-1){
                gameover()
        }else{
                setDebutant({...debutant,idQuestion:debutant.idQuestion+=1,btnDisabled:true,userAnswer:null})
                
        }

       
    }

    const getPercent = (maxQuest,ourScore)=> (ourScore/maxQuest) * 100

    
    const gameover = () => {

        const gradPercdent = getPercent(debutant.maxQuestion,debutant.score)

        if(gradPercdent >= 50){
                setDebutant({...debutant,quizLevel:debutant.quizLevel+1,percent:gradPercdent,quizOver:true})
        }else{
            setDebutant({...debutant,percent:gradPercdent,quizOver:true})
        }
       
       }

    const loadLevelQuestion = (params)=>{
       
        setDebutant({...debutant,quizOver:false})
        
        loadQuestion(debutant.levelNames[params])
        console.log(debutant)
        
    }

 
   console.log(debutant.quizOver)
    return debutant.quizOver ? (<QuizOver ref={storedDataRef} 
    levelNames={debutant.levelNames} 
    score={debutant.score} 
    maxQuestion={debutant.maxQuestion} 
    quizLevel = {debutant.quizLevel}
    percent = {debutant.percent}
    loadLevelQuestion = {loadLevelQuestion}
    
    
    />) : (  <div>
            <ToastContainer />
            <Levels/>
            <ProgressBar stateId={debutant.idQuestion}/>
            <h2>{debutant.question !== null && debutant.question}</h2>
            {debutant.options.map((option,index)=>{
             
                return <p className={`answerOptions ${debutant.userAnswer == option && 'selected'}`} onClick={()=>handleClick(option)} key={index}>{option}</p>
            })}
           
            <button className='btnSubmit' onClick={nextQuestion} disabled={debutant.btnDisabled}>Suivant</button>
        </div>)
    
}

export default Quizz;