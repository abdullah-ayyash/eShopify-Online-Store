// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchSessionData, registerAccount, accountLogin } from './utils/index'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  // user login or register state
  const [registered, setRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  // Register stats
  const [registerUserName, setRegisterUserName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Login stats
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  useEffect(() => {

    fetchSessionData().then(response => {
      if (response) {
        setIsLoggedIn(true);
        setUserData(response)
      }
      else {
        console.log('User is not logged in');
        setIsLoggedIn(false);
      }
    })
      .catch(console.error);

  }, [])

  const register = async (e) => {
    e.preventDefault();
    const response = await registerAccount(registerUserName, registerEmail, registerPassword);
    console.log(response);
    if (response.ok) {
      setRegistered(true);
      setRegisterUserName('');
      setRegisterEmail('');
      setRegisterPassword('');
    }
  }

  const login = async (e) => {
    e.preventDefault();
    const response = await accountLogin(loginUserName, loginPassword);
    if (response) {
      setIsLoggedIn(true);
      setUserData(response);
      setLoginUserName(null);
      setLoginPassword(null);
    }
  }

  return (
    <Router>
      <Navigation setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path='/login' element={<Login 
        setLoginUserName={setLoginUserName} 
        setLoginPassword={setLoginPassword} 
        login={login} 
        isLoggedIn={isLoggedIn}
        loginUserName={loginUserName}
        loginPassword={loginPassword}
        />} >
        </Route>
        <Route path='/register' element={<Register 
        setRegisterUserName={setRegisterUserName} 
        setRegisterEmail={setRegisterEmail} 
        setRegisterPassword={setRegisterPassword}
        registerUserName={registerUserName}
        registerEmail={registerEmail}
        registerPassword={registerPassword}
        registered={registered}
        register={register}
        isLoggedIn={isLoggedIn}
        />} >
        </Route>



      </Routes>
    </Router>




  );
}

export default App;
