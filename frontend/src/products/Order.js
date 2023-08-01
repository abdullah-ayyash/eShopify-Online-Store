import React from 'react'

function Order({data}) {
    const { subtotal,title,category,order_id,product_id,quantity,status,order_date } = data;
    const dateObj = new Date(order_date);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.getDate();
    const dateText = month + ' ' + day + ' ,' + year;
    return (
        <div className='order-container'>
            <div>
                <img src={require(`../images/${category.toLowerCase()}/${product_id}.webp`)} alt='product' />
            </div>
            
            <section className='order-info-container'>
                <h2>Order ID: {order_id} ( {dateText} )</h2>
                <p><b>Item:</b> {title}</p>
                <p><b>Total:</b> {subtotal}</p>
                <p><b>Category:</b> {category}</p>
                <p><b>Quantity:</b> {quantity}</p>
                <p className='order-status'><b>STATUS:</b> {status}</p>
            </section>
        </div>
    )
}

export default Order
