import './App.css';
import { useState, useEffect } from 'react';
import { registerAccount, accountLogin } from './utils/index'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes, Navigate } from 'react-router-dom';
import { useAuth } from './authenticate/AuthContext';
import Navigation from './components/Navigation';
import UserNavigation from './components/UserNavigation';
import Login from './components/Login';
import Register from './components/Register';
import Loader from './components/Loader'



function App() {
  // states
  const [registered, setRegistered] = useState(false);
  const { isLoggedIn, setIsLoggedIn, userData, setUserData,isAuthLoaded, setIsAuthLoaded } = useAuth();
  

  // Register states
  const [registerUserName, setRegisterUserName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Login states
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');




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

  if(!isAuthLoaded){
    return <Loader />
  }

  return (
    <Router>

      {isLoggedIn ? <UserNavigation setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} /> : <Navigation />}

      <Routes>

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login
                setLoginUserName={setLoginUserName}
                setLoginPassword={setLoginPassword}
                login={login}
                isLoggedIn={isLoggedIn}
                loginUserName={loginUserName}
                loginPassword={loginPassword}
              />
            )
          }
        />

        <Route
          path="/register"
          element={
            isLoggedIn ? (
              // Redirect to the main page if the user is already logged in
              <Navigate to="/" />
            ) : (
              <Register
                setRegisterUserName={setRegisterUserName}
                setRegisterEmail={setRegisterEmail}
                setRegisterPassword={setRegisterPassword}
                registerUserName={registerUserName}
                registerEmail={registerEmail}
                registerPassword={registerPassword}
                registered={registered}
                register={register}
                isLoggedIn={isLoggedIn}
              />
            )
          }
        />



      </Routes>
    </Router>




  );
}

export default App;
