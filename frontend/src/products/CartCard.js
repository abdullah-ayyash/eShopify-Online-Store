import { useState } from "react";

function CartCard({item}) {
    const { description,name,price,quantity,category_name,product_id } = item;
    const [newQuantity, setQuantity] = useState(quantity);

    // Don't forget creating Update Quantity endpoint
    return (
        <div className="cart-item">
            <div className="item-image">
                <img src={require(`../images/${category_name.toLowerCase()}/${product_id}.webp`)} alt="Item" />
            </div>
            <div className="item-details">
                <div className="item-name">{name}</div>
                <div className="item-price">${price}</div>
                <div className="item-description">{description}</div>
            </div>
            <div className="item-quantity">
                <input type="number" min="1" value={newQuantity} onChange={(e)=> setQuantity(e.target.value)} />
            </div>
            <div className="item-actions">
                <span className="item-remove-btn">Remove</span>
            </div>
        </div>
    );
}

export default CartCard;
