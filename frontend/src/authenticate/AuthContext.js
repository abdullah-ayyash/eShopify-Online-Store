// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchSessionData } from '../utils/index'
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {

    fetchSessionData().then(response => {
      if (response) {
        setIsLoggedIn(true);
        setUserData(response);
        console.log(response);
      }
      else {
        console.log('User is not logged in');
        setIsLoggedIn(false);
      }
      setIsAuthLoaded(true);
    })
      .catch(console.error);

  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData,isAuthLoaded, setIsAuthLoaded }}>
      {children}
    </AuthContext.Provider>
  );

}
