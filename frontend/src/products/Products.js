import ProductCard from "./ProductCard";
import { useAuth } from "../authenticate/AuthContext";
import Loader from '../components/Loader'




function Products() {
  const { productsData, productsLoaded,userData } = useAuth();

  if (!productsLoaded) {
    return <Loader />
  }
  return (
    <div id="product-cards">

      {
        productsData.map((product) =>
          <ProductCard product={product} key={product.product_id} imageIndex={product.product_id} userData={userData} />

        )
      }


    </div>
  );
}

export default Products;
