import { useState, useEffect } from "react";
import { addToCart, checkCart } from "../utils";
import { useAuth } from "../authenticate/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'


function ProductCard({ product, imageIndex, userData }) {
    const { category_id, description, name, price, product_id } = product;
    const [quantity, setQuantity] = useState(1);
    const [cartAdded, setCartAdded] = useState(false);
    const { isLoggedIn } = useAuth();
    const [category, setCategory] = useState(null);
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

        // Independant of login
        if (category_id === 1) {
            setCategory('watches');
        }
        else if (category_id === 2) {
            setCategory('bands');
        }
        else if (category_id === 3) {
            setCategory('Bracelets');
        }

    }, [isLoggedIn]);

    const addToCartHandler = async () => {
        if (isLoggedIn) {
            const response = await addToCart(product_id, quantity, user_id);
            if (response === true) {
                setCartAdded(true);
            }
        }
        else{
            navigate('/login');
        }


    }
    if (!category) {
        return <Loader />
    }

    if (category) {
        return (
            <div id="product-card">
                <img src={require(`../images/${category.toLowerCase()}/${imageIndex}.webp`)} alt="product" />
                <h4>{category.toUpperCase()}</h4>
                <h3>{name}</h3>
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


}

export default ProductCard;
