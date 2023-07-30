import React from 'react'
import { useAuth } from '../authenticate/AuthContext'
import { useNavigate } from 'react-router-dom';

function ShippingDetails() {
    const navigate = useNavigate();
    const { firstname, setFirstname, lastname, setLastname,
        address, setAddress, country, setCountry, postalCode, setPostalCode,
        city, setCity, provance, setProvance } = useAuth();

    const submitHandler = (e) =>{
        e.preventDefault();
        navigate("/checkout")
    }
    return (
        <div className="shipping-container">
            <h1>Shipping</h1>
            <p>Please enter your shipping details.</p>
            <hr />
            <form className="shipping-form" onSubmit={submitHandler}>

                <div className="shipping-fields Shipping-fields--2">
                    <label className="shipping-field">
                        <span className="shipping-field__label" htmlFor="firstname">First name</span>
                        <input className="shipping-field__input" type="text" id="firstname" 
                        value={firstname} onChange={(e) => setFirstname(e.target.value)} required
                        />
                    </label>
                    <label className="shipping-field">
                        <span className="shipping-field__label" htmlFor="lastname">Last name</span>
                        <input className="shipping-field__input" type="text" id="lastname" 
                        value={lastname} onChange={(e) => setLastname(e.target.value)} required
                         />
                    </label>
                </div>
                <label className="shipping-field">
                    <span className="shipping-field__label" htmlFor="address">Address</span>
                    <input className="shipping-field__input" type="text" id="address" 
                    value={address} onChange={(e) => setAddress(e.target.value)} required
                    />
                </label>
                <label className="shipping-field">
                    <span className="shipping-field__label" htmlFor="country">Country</span>
                    <select className="shipping-field__input" id="country" 
                    value={country} onChange={(e) => setCountry(e.target.value)} required
                    >
                        <option value=""></option>
                        <option value="unitedstates">Canada</option>
                    </select>
                </label>
                <div className="shipping-fields shipping-fields--3">
                    <label className="shipping-field">
                        <span className="shipping-field__label" htmlFor="postalCode">Postal code</span>
                        <input className="shipping-field__input" type="text" id="postalCode" 
                        value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required
                        />
                    </label>
                    <label className="shipping-field">
                        <span className="shipping-field__label" htmlFor="city">City</span>
                        <input className="shipping-field__input" type="text" id="city" 
                        value={city} onChange={(e) => setCity(e.target.value)} required
                        />
                    </label>
                    <label className="shipping-field">
                        <span className="shipping-field__label" htmlFor="provance">Provance</span>
                        <input className="shipping-field__input" type="text" id="provance" 
                        value={provance} onChange={(e) => setProvance(e.target.value)} required
                        />
                    </label>
                </div>
                <button className="shipping-button" type='submit'>Continue</button>
                <button className="back-button" onClick={() => navigate("/cart")}>Back to cart</button>
            </form>
            
        </div>
    )

}

export default ShippingDetails
