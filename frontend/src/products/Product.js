import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useAuth } from '../authenticate/AuthContext';
import Loader from '../components/Loader';
import { checkCart,addToCart } from '../utils';


function Product() {
    const navigate = useNavigate();
    const { id } = useParams();
    const intId = parseInt(id)
    const { productsData, productsLoaded,isLoggedIn,userData } = useAuth();
    const [singleProductData, setSingleProductData] = useState(null);
    const [cartAdded, setCartAdded] = useState(false);
    

    useEffect(() => {

        if (productsLoaded) {
            const data = productsData.filter(item => item.product_id === intId);
            if (data.length > 0) {
                const text = data[0].content.split('\n\n');
                setSingleProductData({...data[0],content:text});
            }
            else {
                setSingleProductData(0);
            }
        }

    }, [productsLoaded]);

    useEffect(() => {
        const checkCartStatus = async () => {
          if (isLoggedIn && singleProductData) {
            try {
              const response = await checkCart(singleProductData.product_id, userData.user_id);
              setCartAdded(response);
            } catch (err) {
              console.log(err);
            }
          } else {
            setCartAdded(false);
          }
        };
        checkCartStatus();
      }, [isLoggedIn, singleProductData]);
      

      const addToCartHandler = async () => {
        if (isLoggedIn) {
          try {
            const response = await addToCart(product_id, 1, userData.user_id);
            if (response === true) {
              setCartAdded(true);
            } else {
              console.log("failed to add to cart");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          navigate('/login');
        }
      };
      

    if (singleProductData === null) {
        return <Loader />
    }
    if (singleProductData === 0) {
        return <h1>Product does not exist</h1>
    }
    const { product_id, content, description, name, price, category_name } = singleProductData;
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
                            content.map((p,index) => <p key={index}>{p}</p>)
                        }
                        
                    </section>

                </section>

            </div>
        </div>
    )
}

export default Product


    // let paragraphs;
    // // spliting paragraphs
    // if(singleProductData.content){
    
    //     const text = singleProductData.content.split('\n\n');
    //     paragraphs = text;
    // }
    // else{
    //     paragraphs = 0;
    // }