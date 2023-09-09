import React, { useContext, useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth, db } from '../Firebase/firebaseConfig';
import  Quizz  from '../Quizz/index.js'
import { AuthContext } from '../../context/userContext';
import { doc, getDoc } from 'firebase/firestore';

function Welcome(props) {


    const user = useContext(AuthContext)
    const [userData,setUserData] = useState()
    const [loading,setLoading] = useState(true)


const handleSignOut = ()=>{
   
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}

useEffect(()=>{
    getDoc(doc(db, "users", user.current.uid)).then(docSnap => {
        if (docSnap.exists()) {
          
          setUserData(docSnap.data())
          setLoading(false)
        } else {
        
          setLoading(false)
        }
      })
},[])


    return (

       
        <div className='quiz-bg'>
            
            <div className='container'>
                {!loading && <Quizz data={userData}/>}
            </div>

            <button onClick={handleSignOut}>Deconnexion</button>
        </div>
    );
}

export default Welcome;