import { useState, useEffect } from "react";
import { addToCart, checkCart } from "../utils";
import { useAuth } from "../authenticate/AuthContext";
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'


function ProductCard({ product, imageIndex, userData }) {
    const { category_id, description, name, price, product_id } = product;
    const [quantity, setQuantity] = useState(1);
    const [cartAdded, setCartAdded] = useState(false);
    const { isLoggedIn } = useAuth();
    const [category, setCategory] = useState(null);
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
        if (category_id === 1) {
            setCategory('watches');
        }
        else if (category_id === 2) {
            setCategory('bands');
        }

    }, []);

    const addToCartHandler = async () => {
        const response = await addToCart(product_id, quantity, user_id);
        console.log(response);
        if (response === true) {

            setCartAdded(true);
        }
    }
    if(!category){
        return <Loader />
    }

    if (category) {
        return (
            <div id="product-card">
                <img src={require(`../images/${category}/${imageIndex}.webp`)} alt="product" />
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


}

export default ProductCard;
