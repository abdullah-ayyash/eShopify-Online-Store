import './App.css';
import { useState } from 'react';
import { registerAccount, accountLogin } from './utils/index'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes, Navigate } from 'react-router-dom';
import { useAuth } from './authenticate/AuthContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Loader from './components/Loader';
import Profile from './components/Profile';



function App() {
  // states
  const [registered, setRegistered] = useState(false);
  const { isLoggedIn, setIsLoggedIn, userData, setUserData, isAuthLoaded } = useAuth();


  // Register states
  const [registerUserName, setRegisterUserName] = useState('');
  const [fullName, setfullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Login states
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const register = async (e) => {
    e.preventDefault();
    const response = await registerAccount(registerUserName, fullName, registerEmail, registerPassword);
    console.log(response);
    if (response) {
      setRegistered(true);
      setRegisterUserName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setfullName('');
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
  // This take care of which coponents to show ( can do some cleaning to reduce checking )
  if (!isAuthLoaded) {
    return <Loader />
  }

  return (
    <Router>

      {<Navigation setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}

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
                setfullName={setfullName}
                setRegisterEmail={setRegisterEmail}
                setRegisterPassword={setRegisterPassword}
                registerUserName={registerUserName}
                fullName={fullName}
                registerEmail={registerEmail}
                registerPassword={registerPassword}
                registered={registered}
                register={register}
                isLoggedIn={isLoggedIn}
              />
            )
          }
        />

        <Route path="/profile" element={ isLoggedIn ?
          <Profile isLoggedIn={isLoggedIn} userData={userData} /> : <Navigate to="/" />
        } >

        </Route>


      </Routes>
    </Router>

  );
}

export default App;
