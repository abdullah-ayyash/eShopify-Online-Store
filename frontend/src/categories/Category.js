import ProductCard from "../products/ProductCard";
import { useAuth } from "../authenticate/AuthContext";
import Loader from '../components/Loader'
import { useEffect, useState } from "react";
import { getCategoryProducts } from "../utils";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils";

function Category() {
    const { userData } = useAuth();
    const [productData, setProductData] = useState();
    const [productsLoaded, setProductsLoaded] = useState(false);
    const { categoryName } = useParams();

    // I could improve performance by getting category based products from state
    useEffect(() => {
        getCategoryProducts(capitalizeFirstLetter(categoryName)).then(response => {
            setProductData(response);
            setProductsLoaded(true);
        });

    }, []);

    if (!productsLoaded) {
        return <Loader />
    }

    return (
        <div>
            <h1 id="category-heading">BEST SELLER {categoryName.toUpperCase()}</h1>
            <div id="product-cards">
            {
                productData.map(product => <ProductCard product={product} key={product.product_id} imageIndex={product.product_id} userData={userData} />)
            }
            </div>

        </div>
    )
}

export default Category;
