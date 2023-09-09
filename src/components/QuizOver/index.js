import React, { useEffect, useState } from 'react';



const QuizOver = React.forwardRef((props,ref)=> {
 

        const[asked,setAsked] = useState([])
        const {levelNames,score,maxQuestion,quizLevel,percent,loadLevelQuestion} = props
        

     

       useEffect(()=>{
          setAsked(ref.current)
       },[ref.current])

       const averageGrade = maxQuestion/2
      const decision = score >= averageGrade ? (
        <>
          <div className='stepsBtnContainer'>
            {
                quizLevel < levelNames.length ? 
                (
                    <>
                    <p className='successMsg'>Bravo passez au niveau suivant </p>
                    <button className='btnResult success' onClick={() => {loadLevelQuestion(quizLevel)}}>Niveau suivant</button>
                    </>
                ) : 
                (
                    <>
                    <p className='successMsg'>Bravo</p>
                    <button className='btnResult gameOver' onClick={() => {loadLevelQuestion(0)}}>Niveau suivant</button>
                    </>
                )
            }
            </div>
            <div className='percentage'>
                    <div className='progressPercent'>Reussite : {percent}%</div>
                    <div className='progressPercent'>Note:{score}/{maxQuestion}</div>
            </div>
        </>
      ) : (
        <>
        <div className='stepsBtnContainer'>
                    <p className='successMsg'>Vous avez échoué </p>
                    <button className='btnResult success' onClick={() => {loadLevelQuestion(0)}}>Niveau suivant</button>
        </div>
        <div className='percentage'>
                    <div className='progressPercent'>Reussite : {percent}%</div>
                    <div className='progressPercent'>Note:{score}/{maxQuestion}</div>
            </div>
        </>
      )
       
      const questionAnswer = score >= averageGrade ? (
         asked !== null && asked.map((question)=>{
            return(
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button className='btnInfo'>Info</button>
                    </td>
                </tr>
            )
        })
      ) : (
        <tr colSpan="3" >
             
                <td>
                    <p>Pas de réponse!</p>
                </td>
        </tr>
      )
    


        return (
            <>
           {decision}
            
            <hr/>
            <p>Les reponse aux questions posées</p>
            <div className='answerContainer'>
                <table className='answer'>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Reponse</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                      {questionAnswer}
                    </tbody>
                </table>
            </div>
            </>
        );
    })






export default QuizOver;