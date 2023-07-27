import CartCard from "./CartCard";
import { useEffect, useState } from "react";
import { getCartItems } from "../utils";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'

function Cart({ isLoggedIn, userData }) {
  const [cartData, setCartData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      const { user_id } = userData;
      if (user_id) {
        getCartItems(user_id).then(response => {
          if (response === false) {
            setCartData(0);
          }
          else {
            console.log(response);
            setCartData(response);
          }
        }).catch(console.error);
      }
    }


  }, []);

  if (!isLoggedIn) {
    navigate("/login");
  }
  if (cartData === null) {
    return <Loader />
  }
  if (cartData === 0) {
    return <h1>You have no cart items</h1>
  }
  return (
    <div className="cart-container">
      <h1>MY CART ITEMS</h1>
      {
          cartData.map((item,index) => <CartCard item={item} key={index} />)
      }
      <button id="cart-page-checkout-btn">Proceed to Checkout</button>
    </div>
  );
}

export default Cart;



