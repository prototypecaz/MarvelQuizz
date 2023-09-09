import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/firebaseConfig';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login(props) {


    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[btn,setBtn] = useState(false)
    const navigate = useNavigate()
    const [etat,setEtat] = useState(true)

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        if(password.length > 5 && email !== ''){
            setBtn(true)
        }else{
            setBtn(false)
        }
    },[password,email])

    const handleSubmit = (e)=>{
        e.preventDefault()
        setEtat(false)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            console.log(userCredential.user.emailVerified)
            if(userCredential.user.emailVerified){
                setEtat(false)
                navigate('/Welcome')
            }else{
                setEtat(true)
                console.log("verifier votre email")
            }
            
            //navigate('/Welcome')
            // ...
        })
        .catch((error) => {
            setEtat(true)
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const handleMot = ()=>{
        sendPasswordResetEmail(auth, "guillaume.cazes21@gmail.com")
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }


    return (
        <div className='signUpLoginBox'>
           {etat &&  <div className="slContainer">
                 <form onSubmit={handleSubmit}>
                    <input onChange={handleEmail} value = {email} type="email" placeholder='email' required/>
                    <input onChange={handlePassword} value={password} type="text" placeholder='password'/>
                    {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                </form>
                
                
                <button onClick={handleMot}>Mot de passe oublier</button>
                
            </div>}
            {!etat && <div className='loader'></div>}
        </div>
    );
}

export default Login;