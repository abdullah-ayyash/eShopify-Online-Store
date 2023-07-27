import ShopByCategory from "./ShopByCategory";
import Products from "../products/Products";

function HomePage() {

    return (
      <div>
        <ShopByCategory />
        <center><h2 id="top-picks-heading">Top Picks</h2></center>
        <Products />
      </div>
    );
  }
  
  export default HomePage;
  