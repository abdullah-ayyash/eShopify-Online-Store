import React from 'react'

function Addresses({addressData,addressStyles,addressHandler}) {

    if(addressData){
        const { user_id, first_name, last_name, address, country, postal_code, city, provance } = addressData;
        return (
            <div id='addresses-container'>
              <h1>CURRENT ADDRESS</h1>
              <section style={addressStyles} onClick={addressHandler}>
                <h2>Shipping Address</h2>
                <ul>
                    <li>First Name: {first_name}</li>
                    <li>Last Name: {last_name}</li>
                    <li>Street {address}</li>
                    <li>Country: {country}</li>
                    <li>Provance: {postal_code}</li>
                    <li>City: {city}</li>
                    <li>Postal Code: {provance}</li>
                </ul>
              </section>
            </div>
          )
    }
    if(!addressData){
        return <h1>No Address added yet</h1>
    }
    

}

export default Addresses
