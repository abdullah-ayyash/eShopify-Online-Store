import React from 'react'

function CheckOut() {
    return (
        <div>
            <h1>Shipping Details</h1>
            <form id="shippingForm">
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" id="fullName" name="fullName" required />

                <label htmlFor="address">Address:</label>
                <textarea id="address" name="address" rows="4" required></textarea>

                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" required />

                <label htmlFor="state">State/Province:</label>
                <input type="text" id="state" name="state" required />

                <label htmlFor="zip">ZIP/Postal Code:</label>
                <input type="text" id="zip" name="zip" required />

                <label htmlFor="country">Country:</label>
                <input type="text" id="country" name="country" required />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" required />

                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default CheckOut
