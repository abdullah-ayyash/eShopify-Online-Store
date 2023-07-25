import ProductCard from "./ProductCard";
import { useAuth } from "../authenticate/AuthContext";
import Loader from '../components/Loader'

function Products() {
  const { productsData, productsLoaded } = useAuth();

  if (!productsLoaded) {
    return <Loader />
  }
  return (
    <div id="product-cards">

      {
        productsData.map(product =>
          <ProductCard product={product} key={product.product_id} />

        )
      }


    </div>
  );
}

export default Products;
