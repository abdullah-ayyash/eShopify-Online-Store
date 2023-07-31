import { useAuth } from '../authenticate/AuthContext'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Addresses from './Addresses';
import { addNewAddress } from '../utils';

function ShippingDetails() {
    const navigate = useNavigate();
    const { firstname, setFirstname, lastname, setLastname,
        address, setAddress, country, setCountry, postalCode, setPostalCode,
        city, setCity, provance, setProvance,addressData,isClicked, setIsClicked, setAddressChange,userData } = useAuth();
    const userId = userData.user_id;

    const submitHandler = async(e) => {
        e.preventDefault();
        const addressObj = {
            userId,
            firstname, 
            lastname, 
            address, 
            country, 
            postalCode, 
            city, 
            provance
        }
        const result = await addNewAddress(addressObj);
        if(result){
            setAddressChange(prevAddressChange => !prevAddressChange);
            navigate("/checkout")
        }
        else{
            alert("Something went wrong");
        }
        
    }

    const addressHandler = ()=>{
        setIsClicked(!isClicked);
    }

    const addressStyles = {
        border: isClicked ? '2px solid green' : 'none',
        boxShadow: isClicked ?  'none' : 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        cursor: 'pointer',
        backgroundColor: isClicked ? 'lightgreen' : 'transparent'
      };

    if (addressData === null) {
        return <Loader />
    }
    if(addressData){
        return (
            <div id='shipping-details-address' >
                <Addresses addressData={addressData} addressStyles={addressStyles} addressHandler={addressHandler} />
                <button className="shipping-button" onClick={()=> {
                    isClicked ? navigate("/checkout") : alert('Please Select an address');
                }}>Continue</button>
                <button className="back-button" onClick={() => navigate("/cart")}>Back to cart</button>
            </div>
        )
    }
    if (addressData === 0) {
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
                            <option value="Canada">Canada</option>
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
                    <center>
                    <button className="shipping-button" type='submit'>Continue</button>
                    <button className="back-button" onClick={() => navigate("/cart")}>Back to cart</button>
                    </center>

                </form>

            </div>
        )
    }

}

export default ShippingDetails
