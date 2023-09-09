import React,{useRef,useEffect,useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/userContext';

function Landing(props) {

    const refWolverine = useRef(null)
    const [afficheButton,setAfficheButton] = useState(false)
   


    useEffect(() => {
            refWolverine.current.classList.add('startingImg')

            setTimeout(() => {
                refWolverine.current.classList.remove('startingImg')
                setAfficheButton(true)
            },1000)
    },[])

    const handleLeft= () => {
        refWolverine.current.classList.add('leftImg')
    }

    const handleRight = () => {
        refWolverine.current.classList.add('rightImg')
    }

    const clear = ()=>{
        if( refWolverine.current.classList.contains('leftImg')){
            refWolverine.current.classList.remove('leftImg')
        }else{
            refWolverine.current.classList.remove('rightImg')
        }
    }


  



    return (

       
        <main ref={refWolverine} className='welcomePage'>
            <div className='leftBox' onMouseOver={handleLeft} onMouseOut={clear}>
                {afficheButton && <Link className='btn-welcome' to={'/signUp'}>Inscription</Link>}
            </div>
            <div className='rightBox' onMouseOver={handleRight} onMouseOut={clear}>
                {afficheButton && <Link className='btn-welcome' to={'/login'}>Connexion</Link>}
            </div>
        </main>
      
      
    );
}

export default Landing;