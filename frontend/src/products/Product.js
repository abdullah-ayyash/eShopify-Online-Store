import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useAuth } from '../authenticate/AuthContext';
import Loader from '../components/Loader';
import { checkCart,addToCart } from '../utils';


function Product() {
    const { id } = useParams();
    const intId = parseInt(id)
    const { productsData, productsLoaded,isLoggedIn,userData } = useAuth();
    const [productData, setProductData] = useState(null);
    const [paragraphs, setParagraphs] = useState();

    const [cartAdded, setCartAdded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (productsLoaded) {
            const data = productsData.filter(item => item.product_id === intId);
            if (data.length > 0) {
                setProductData(...data);
            }
            else {
                setProductData(0);
            }

            
            if (isLoggedIn && productData) {
                // spliting paragraphs
                const text = productData.content.split('\n\n');
                setParagraphs(text);
                // Cart Added check
                try {
                    checkCart(productData.product_id, userData.user_id).then(response => {
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

        }



    }, [productsLoaded, isLoggedIn,productData])

    const addToCartHandler = async () => {
        if (isLoggedIn) {
            const response = await addToCart(product_id, 1, userData.user_id);
            if (response === true) {
                setCartAdded(true);
            }
        }
        else {
            navigate('/login');
        }
    }

    if (productData === null) {
        return <Loader />
    }
    if (productData === 0) {
        return <h1>Product does not exist</h1>
    }
    const { product_id, content, description, name, price, category_name } = productData;
    if(!paragraphs){
        return <Loader />
    }
    return (
        <div>
            <div id='product-page'>
                <section id='product-page-image'>
                    <img src={require(`../images/${category_name.toLowerCase()}/${product_id}.webp`)} alt="product" />
                </section>

                <section id='product-page-info'>
                    <section id='top-section'>
                        <h1>{name}</h1>
                        <p>{category_name}</p>
                    </section>

                    <section id='bottom-section'>
                        <p id='price'>${price}</p>
                        <p>{description}</p>
                    </section>

                    <section id='product-control'>
                        {
                            cartAdded ?
                                <button id="product-card-checkout-btn" onClick={()=>navigate('/cart')}>PROCEED TO CHECKOUT</button>
                                :
                                <button className="button-37" role="button" onClick={addToCartHandler}>ADD TO CART</button>
                        }

                    </section>
                    <section id='product-content'>
                        <h3>Description</h3>
                        {
                            paragraphs.map((p,index) => <p key={index}>{p}</p>)
                        }
                        
                    </section>
                </section>

            </div>
        </div>
    )
}

export default Product
