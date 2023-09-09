import React, { useRef, useState } from 'react';
import {auth} from '../Firebase/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'; 
import { doc, setDoc } from "firebase/firestore";
import { db } from '../Firebase/firebaseConfig';



function SignUp(props) {

const data = {
    pseudo:'',
    email: '',
    password: '',
    confirmPassword : ''
}

const [login,setLogin] = useState(data)
const [error,setError] = useState("")
const [sendEmail,setSendEmail] = useState(false)
const navigate = useNavigate()

const passwordRef = useRef()

const handleSubmit = (e)=>{
console.log(data)
    e.preventDefault()
  
     createUserWithEmailAndPassword(auth, login.email, login.password)
    .then((userCredential) => {
      
        if(userCredential){
            /*sendEmailVerification(userCredential.user).then(()=>{
                    setSendEmail(true)

                    
                   
                    
                    
                    /*if(userCredential.user.emailVerified){
                        navigate('/')
                    }else{
                        
                    }

            })*/
            setDoc(doc(db, "users", userCredential.user.uid), {
                pseudo:login.pseudo,
                email: login.email
              });
        }
       
        /*setLogin({...data})
        navigate('/welcome')*/
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
    
}

const handleChange = (e) => {
    setLogin({...login,[e.target.id]:e.target.value})
}

const handleFocus = ()=> {

switch (true) {
    case passwordRef.current.value.length <= 8:
        setError('Le mot de passe est trop faible')
      break;
    case passwordRef.current.value.match(/[A-Z]/g) == null:
        setError("Le mot de passe n'a pas de majuscule")
      break;
  
    default:
      setError('')
  }


  
}


const btn = login.password !== login.confirmPassword || login.password == "" || error !== '' ? <button disabled>Inscription</button> : <button>Inscription</button>

const messageError = error !== '' && <span>{error}</span>


    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                {!sendEmail ?   (<div><form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    <input id="pseudo" onChange={handleChange} type="text" placeholder="Pseudo"/>
                    <input id="email" onChange={handleChange} type="text" placeholder="Email"/>
                    <input ref={passwordRef} id="password" onFocus={()=> { setError('')}}  onChange={handleChange}  type="text" placeholder='Password' />
                    {messageError}
                    <input id="confirmPassword" onFocus={handleFocus} onChange={handleChange} type="text" placeholder='confirmPassword'/>
                    {btn}
                </form>
              

                <div>
                    <Link to="/login">Vous etes deja inscrit ? Connectez vous</Link>
                </div></div>):(<div>Un email de verification a était envoyer <Link to="/login">Connectez vous</Link></div>)}
            </div>
        </div>
    );
}

export default SignUp;