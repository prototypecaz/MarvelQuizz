
import '../../App.css';
import Header from '../Header';
import Landing from '../Landing'
import Footer from '../Footer'
import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';
import ErrorPage from '../ErrorPage';
import {Routes,Route,Navigate, useNavigate} from 'react-router-dom';
import { useContext} from 'react';
import { AuthContext } from '../../context/userContext';

function App() {

      const {current} = useContext(AuthContext)
     

      console.log(current)
  return (
    
    <>
        <Header/>

            

      <Routes>
          <Route path="/" exact element={<Landing/>}></Route>
          <Route path='/welcome' exact element={ current ? <Welcome/> : <Navigate to="/login" replace={true}/>}></Route> 
          <Route path='/login' exact element={<Login/>}></Route>
          <Route path='/signUp' exact element={<SignUp/>}></Route>
          <Route path='*' element={<ErrorPage/>}></Route>
      </Routes>



      <Footer/>
    </>
      
   

   
  );
}

export default App;
