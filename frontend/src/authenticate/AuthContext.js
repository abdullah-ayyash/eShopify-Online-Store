// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchSessionData,fetchProducts } from '../utils/index'
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [ productsData, setproductsData] = useState(false);
  const [ productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {

    // Checking if logged in
    fetchSessionData().then(response => {
      if (response) {
        setIsLoggedIn(true);
        setUserData(response);
      }
      else {
        console.log('User is not logged in');
        setIsLoggedIn(false);
      }
      setIsAuthLoaded(true);
    }).catch(console.error);
    // getting products
    fetchProducts().then(response =>{
      if(response){
        setproductsData(response);
        setProductsLoaded(true);
      }
      else{
        console.log('There are no products');
      }

    }).catch(console.error);


  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, 
    setUserData,isAuthLoaded, setIsAuthLoaded,productsData,productsLoaded }}>
      {children}
    </AuthContext.Provider>
  );

}
