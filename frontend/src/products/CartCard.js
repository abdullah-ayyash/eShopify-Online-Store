// import { useState } from "react";


function CartCard({item,deleteItem,updateQuantityHandler}) {
    const { description,name,price,quantity,category_name,product_id,item_id } = item;
    // const [newQuantity, setNewQuantity] = useState(quantity);
    // const [initialRender, setInitialRender] = useState(true);



    // There is a swapping (mismatch, missassinment) issue at first change of quantity. Look into it.
    const quantityOnChange = async (e) =>{
        await updateQuantityHandler(item_id,e.target.value);
    }
    
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
                <input type="number" min="1" value={quantity} onChange={quantityOnChange} />
            </div>
            <div className="item-actions">
                <span className="item-remove-btn" onClick={() => deleteItem(item_id)}>Remove</span>
            </div>
        </div>
    );
}

export default CartCard;
