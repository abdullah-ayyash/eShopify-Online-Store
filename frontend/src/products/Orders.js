import React from 'react'
import Order from './Order'
import { useAuth } from '../authenticate/AuthContext'
import Loader from '../components/Loader'

function Orders() {
  const { orderData } = useAuth();

  if (orderData === null) {
    return <Loader />;
  }
  if (orderData === 0) {
    return <h1>No orders exist for your account</h1>
  }
  return (
    <div id='orders-page'>
      <h1>MY ORDERS</h1>
      <div id='orders-container'>
        {
          orderData.map((order,index) => <Order data={order} key={index} />)
        }
      </div>
    </div>
  )
}

export default Orders
