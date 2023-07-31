import React from 'react'
import Order from './Order'


function Orders() {
  return (
    <div>
        <div id='orders-container'>
            <h1>My Orders</h1>
            <Order data={'order data'} />
        </div>
    </div>
  )
}

export default Orders
