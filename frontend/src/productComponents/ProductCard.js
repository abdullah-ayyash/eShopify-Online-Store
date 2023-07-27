import { useState, useEffect } from "react";
import { addToCart, checkCart } from "../utils";
import { useAuth } from "../authenticate/AuthContext";
import { Link } from 'react-router-dom';


function ProductCard({ product, image, userData }) {
    const { category_id, description, name, price, product_id } = product;
    const [quantity, setQuantity] = useState(1);
    const [cartAdded, setCartAdded] = useState(false);
    const { isLoggedIn } = useAuth();
    let user_id = false;
    if (userData) {
        user_id = userData.user_id;
    }

    useEffect(() => {

        if (isLoggedIn) {
            try{
                checkCart(product_id, user_id).then(response => {
                    if(response === true){
                        setCartAdded(true);
                    }
                    else{
                        setCartAdded(false);
                    }
                    
                })
            } catch(err){
                console.log(err);
            }

        }

    }, [cartAdded]);

    const addToCartHandler = async () => {
        const response = await addToCart(product_id, quantity, user_id);
        console.log(response);
        if(response === true){
            
            setCartAdded(true);
        }
    }

    return (
        <div id="product-card">
            <img src={image} alt="product" />
            <h3>{name}</h3>
            <h4>{price} $</h4>
            <p>{description}</p>

            {
                cartAdded ? 
                <Link to="/cart"><button id="product-card-checkout-btn">PROCEED TO CHECKOUT</button> </Link> 
                : 
                <button id="product-card-btn" onClick={addToCartHandler}>ADD TO CART
                </button>
            }
                
            

        </div>

    );
}

export default ProductCard;
