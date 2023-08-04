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
import User from './components/User';
import HomePage from './homepage/HomePage.js'
import Products from './products/Products';
import AnnouncementBar from './components/AnnouncementBar';
import Cart from './products/Cart';
import Category from './categories/Category';
import ShippingDetails from './products/ShippingDetails';
import Checkout from './products/Checkout';
import Orders from './products/Orders';
import EditProfile from './components/EditProfile';
import Product from './products/Product';

function App() {
  // states
  const [registered, setRegistered] = useState(false);
  const { isLoggedIn, setIsLoggedIn, userData, setUserData, isAuthLoaded,setLoginMessage,setRegisterMessage } = useAuth();


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
    if (response.message === 'Registration Successful') {
      setRegistered(true);
      setRegisterUserName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setfullName('');
    }
    else if(response?.errors?.length > 0){
      console.log(response.errors[0].msg)
      setRegisterMessage(response.errors[0].msg);
    }
  }

  const login = async (e) => {
    e.preventDefault();
    const response = await accountLogin(loginUserName, loginPassword);
    if (response.message === 'Login successful') {
      console.log(response.message)
      setUserData(response.user);
      setIsLoggedIn(true);
      setLoginUserName(null);
      setLoginPassword(null);
    }
    else if(response.message === 'Incorrect username.'){
      setLoginMessage(response.message);
      console.log(response.message)
    }
    else if(response.message === 'Incorrect password.'){
      setLoginMessage(response.message);
      console.log(response.message)
    }
    else if(response?.errors?.length > 0){
      console.log(response?.errors);
      console.log(response.errors[0].msg)
      setLoginMessage(response.errors[0].msg);
    }
  }
  // This take care of which coponents to show ( can do some cleaning to reduce checking )
  if (!isAuthLoaded) {
    return <Loader />
  }

  return (
    <Router>
      
      <AnnouncementBar />
      <Navigation setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      
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

        <Route path="/user" element={isLoggedIn ? 
          <User isLoggedIn={isLoggedIn} userData={userData} /> : <Navigate to="/" />} >
        </Route>

        <Route path='/products' element={ <Products /> }></Route>

        <Route path='/cart' element={ <Cart isLoggedIn={isLoggedIn} userData={userData} /> }></Route>

        <Route path='/' element={<HomePage />} >
        </Route>

        <Route path='/category/:categoryName' element={ <Category /> } >
        </Route>

        <Route path='/product/:id' element={ <Product />} >
        </Route>

        <Route path='/shipping-details' element={ isLoggedIn ? <ShippingDetails />  : <Navigate to="/" /> }>
        </Route>

        <Route path='/checkout' element={ isLoggedIn ? <Checkout />  : <Navigate to="/" /> } >
        </Route>

        <Route path='/orders' element={ isLoggedIn ? <Orders /> : <Navigate to="/" /> } >
        </Route>

        <Route path='/edit-profile' element={ isLoggedIn ? <EditProfile /> : <Navigate to="/" /> } >
        </Route>

        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </Router>

  );
}

export default App;
