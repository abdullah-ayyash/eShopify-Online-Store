import ProductCard from "./ProductCard";
import { useAuth } from "../authenticate/AuthContext";
import Loader from '../components/Loader'




function Products() {
  const { productsData, productsLoaded, userData } = useAuth();

  if (!productsLoaded) {
    return <Loader />
  }
  if(productsLoaded && !productsData){
    return <center><h1>There are no products to show</h1></center>
  }
  return (
    <div>
      <h1 id="category-heading">TOP PICKS</h1>
      <div id="product-cards">
        {
          productsData.map((product) =>
            <ProductCard product={product} key={product.product_id} imageIndex={product.product_id} userData={userData} />
          )
        }
      </div>



    </div>
  );
}

export default Products;
