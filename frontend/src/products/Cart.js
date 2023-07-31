import CartCard from "./CartCard";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { getCartItems,sumTotal,deleteCartItem,updateItemQuantity } from "../utils";
import { useAuth } from "../authenticate/AuthContext";

function Cart({ isLoggedIn, userData }) {
  
  const [cartChange, setCartChange] = useState(true);
  const { cartTotal, setCartTotal,cartData, setCartData } = useAuth();
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
            setCartTotal(sumTotal(response));
            setCartData(response);
          }
        }).catch(console.error);
      }
    }


  }, [cartChange]);

  const deleteItem = async (item_id) => {
    const result = await deleteCartItem(userData.user_id, item_id);
    if (result === true) {
      setCartChange(!cartChange);
    }
    else {
      console.log('Failed to remove item from cart');
    }

  }

  const updateQuantityHandler = async (item_id,quantity) =>{
    const result = await updateItemQuantity(userData.user_id,item_id,quantity);
    if(result === true){
      setCartChange(!cartChange);
    }
    else{
      console.log('Failed to change cart item quantity');
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
        cartData.map((item, index) => <CartCard item={item} deleteItem={deleteItem} 
        updateQuantityHandler={updateQuantityHandler} key={index} />)
      }
      <div>
        <h2>Cart Totals</h2>
        <table border="1">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${cartTotal.toFixed(2)} CAD</td>
          </tr>
          <tr>
            <td><b>Total</b></td>
            <td><b>${cartTotal.toFixed(2)} CAD</b></td>
          </tr>
          </tbody>
        </table>
      </div>

      <button id="cart-page-checkout-btn" onClick={() => navigate("/shipping-details")}>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;



