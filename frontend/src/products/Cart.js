import CartCard from "./CartCard";
import { useEffect, useState } from "react";
import { getCartItems } from "../utils";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { deleteCartItem } from "../utils";

function Cart({ isLoggedIn, userData }) {
  const [cartData, setCartData] = useState(null);
  const [cartChange, setCartChange] = useState();
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


  }, [cartChange]);

  const deleteItem = async (item_id) => {
    const result = await deleteCartItem(userData.user_id, item_id);
    if(result === true){
      setCartChange(item_id);
    }
    else{
      console.log('Failed to remove item from cart');
    }
    
  }

  if (!isLoggedIn) {
    navigate("/login");
  }
  if (cartData === null) {
    return <Loader />
  }
  if (cartData === 0) {
    return <h1 id="category-heading">You have no cart items</h1>
  }
  return (
    <div className="cart-container">
      <h1>MY CART ITEMS</h1>
      {
        cartData.map((item, index) => <CartCard item={item} deleteItem={deleteItem} key={index} />)
      }
      <button id="cart-page-checkout-btn">Proceed to Checkout</button>
    </div>
  );
}

export default Cart;



