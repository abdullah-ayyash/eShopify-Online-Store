import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../authenticate/AuthContext';

function Checkout() {
    const navigate = useNavigate();
    const { firstname, lastname,
        address, country, postalCode,
        city, provance, cartData } = useAuth();

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(firstname,lastname,address,country,postalCode,city,provance);
        console.log(cartData);
    }
    return (
        <div id='checkout-container'>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <formfield id="ccn">
                    <label htmlFor="ff1_input">Credit Card Number</label>
                    <input id="ff1_input" type="text" maxLength="4" placeholder="0000" name="cno" autoFocus />
                    <input type="text" maxLength="4" placeholder="0000" name="cno" />
                    <input type="text" maxLength="4" placeholder="0000" name="cno" />
                    <input type="text" maxLength="4" placeholder="0000" name="cno" />
                </formfield>
                <formfield id="ch">
                    <label htmlFor="ff2_input">Card Holder</label>
                    <input id="ff2_input" type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                </formfield>
                <formfield id="ed">
                    <label>Expiration Date</label>
                    <select id="month">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <select id="year">
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                    </select>
                </formfield>
                <formfield id="sc">
                    <label htmlFor="ff4_input">Security Code</label>
                    <input id="ff4_input" type="text" maxLength="3" placeholder="000" />
                    <input type="submit" value="submit" />
                    <button className="back-button" onClick={() => navigate("/shipping-details")}>Back to cart</button>
                </formfield>
            </form>

        </div>
    )
}

export default Checkout
