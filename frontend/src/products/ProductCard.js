import { useState, useEffect } from "react";
import { addToCart, checkCart } from "../utils";
import { useAuth } from "../authenticate/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'


function ProductCard({ product, imageIndex, userData }) {
    const { category_name, description, name, price, product_id } = product;
    
    const [quantity, setQuantity] = useState(1); // implement it
    const [cartAdded, setCartAdded] = useState(false);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    let user_id = false;
    if (userData) {
        user_id = userData.user_id;
    }

    useEffect(() => {

        if (isLoggedIn) {
            try {
                checkCart(product_id, user_id).then(response => {
                    if (response === true) {
                        setCartAdded(true);
                    }
                    else {
                        setCartAdded(false);
                    }

                })
            } catch (err) {
                console.log(err);
            }

        }
        else {
            setCartAdded(false);
        }



    }, [isLoggedIn]);

    const addToCartHandler = async () => {
        if (isLoggedIn) {
            const response = await addToCart(product_id, quantity, user_id);
            if (response === true) {
                setCartAdded(true);
            }
        }
        else {
            navigate('/login');
        }


    }


    return (
        <div id="product-card">
            <img src={require(`../images/${category_name.toLowerCase()}/${imageIndex}.webp`)} alt="product" 
            onClick={() => navigate(`/product/${product_id}`)} />
            <h4>{category_name.toUpperCase()}</h4>
            <h3 onClick={() => navigate(`/product/${product_id}`)}>{name}</h3>
            <h5>${price} CAD</h5>
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
