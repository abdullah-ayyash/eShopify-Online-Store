// image name, price.description
import image1 from "../images/6.webp"

function ProductCard({product}) {
    const { category_id,description,name,price,product_id } = product;

    return (
        <div id="product-card">
            <img src={image1} alt="product" />
            <h3>{name}</h3>
            <h4>{price} $</h4>
            <p>{description}</p>
            <button id="product-card-btn">ADD TO CART</button>
            
        </div>

    );
  }
  
  export default ProductCard;
  