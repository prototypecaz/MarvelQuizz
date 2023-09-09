import React, { createContext, useState,useEffect } from 'react';
import { auth } from '../components/Firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';




export const AuthContext = createContext()

export function AuthContextProvider(props) {

   
    const [current,setCurrent] = useState({})
    const [loading,setLoading] = useState(true)

    useEffect(() => {
         onAuthStateChanged(auth,(user)=>{
            setCurrent(user)
            setLoading(false)
        })

       
    },[])


    return (
       <AuthContext.Provider value={{current}}>
               {!loading && props.children }
       </AuthContext.Provider>
    );
}

