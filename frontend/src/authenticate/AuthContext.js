// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchSessionData, fetchProducts, getAddress } from '../utils/index'
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [productsData, setproductsData] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [provance, setProvance] = useState('');
  const [cartData, setCartData] = useState(null);
  const [addressData, setAddressDate] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [addressChange, setAddressChange] = useState(false);

  useEffect(() => {
    // Independant Call
    fetchProducts().then(response => {
      if (response) {
        setproductsData(response);
        setProductsLoaded(true);

      } else {
        setProductsLoaded(true);
      }
    }).catch(console.error);

    const fetchData = async () => {
      try {
        const sessionResult = await fetchSessionData();
        if (sessionResult) {
          setIsLoggedIn(true);
          setUserData(sessionResult);
        }
        else {
          setIsLoggedIn(false);
        }
        setIsAuthLoaded(true);
        return sessionResult;
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();

  }, []);


  useEffect(() => {
    if (isLoggedIn) {
      getAddress(userData.user_id).then(response => {
        if (response.rowCount > 0) {
          console.log(response.rows);
          setAddressDate(response.rows[0]);
        }
        else if (response.rowCount === 0) {
          setAddressDate(0);
        }
      }).catch(console.error);
    }
  }, [isLoggedIn,addressChange])

  return (
    <AuthContext.Provider value={{
      isLoggedIn, setIsLoggedIn, userData,
      setUserData, isAuthLoaded, setIsAuthLoaded, productsData, productsLoaded,
      cartTotal, setCartTotal, firstname, setFirstname, lastname, setLastname,
      address, setAddress, country, setCountry, postalCode, setPostalCode,
      city, setCity, provance, setProvance, cartData, setCartData, addressData, setAddressDate,
      isClicked, setIsClicked,addressChange, setAddressChange
    }}>
      {children}
    </AuthContext.Provider>
  );

}
