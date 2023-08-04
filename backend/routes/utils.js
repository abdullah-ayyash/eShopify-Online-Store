
const { userExists, addNewUser, queryProducts, cartExists, pushToCart, queryCartItems,
    queryCategoryProducts,deleteCartItem,updateItemQuantity,fetchAddress,addNewAddress, createNewOrder, fetchOrders,
    updateUserInfo
     } = require('../database/database')
const bcrypt = require("bcrypt");

// const loginRoute = (req, res) => {
//     res.status(200).json(req.user);
// }

const registerRoute = async (req, res) => {
    const { username, fullName, email, password } = req.body;
    try {
        const user = await userExists(email);
        if (user) {
            console.log("User already exists!");
            return res.json(user);
        }
        // Hash password

        const salt = await bcrypt.genSalt(3);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUserObj = { username, fullName, email, password: hashedPassword, };
        const newUserReq = await addNewUser(newUserObj);

        res.status(201).json({ message: 'Registration Successful', user });
        



    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const changeUserInfo = async (req,res) =>{
    const { email,password,fullname,user_id } = req.body;
    try{
        const salt = await bcrypt.genSalt(3);
        const hashedPassword = await bcrypt.hash(password,salt);

        const result = await updateUserInfo(email,hashedPassword,fullname,user_id);
        console.log("Changed");
        res.json(result);
    } catch(err){
        console.log('Error changing user info',err);
    }
    
}

const isLoggedIn = (req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.send(false);
    }
}

const getProducts = async (req, res) => {
    try {
        const response = await queryProducts();
        res.status(200).json(response);
    } catch (err) {
        console.log("Failed to get products", err);
    }
}




const addToCart = async (req, res) => {
    const { product_id, quantity, user_id } = req.body;
    const productCheck = await cartExists(user_id, product_id);
    if (productCheck.length > 0) {
        console.log("Product already in cart");
        return res.send(false);
    }
    else {
        try {
            const response = await pushToCart(product_id, quantity, user_id);
            res.status(201).send(true);
        } catch (err) {
            console.log("Failed to push to cart items table", err);
        }
    }


}

const checkCart = async (req,res) =>{
    const { product_id, user_id } = req.query;
    try{
        const result = await cartExists(user_id, product_id);
        if (result.length === 0) {
            return res.send(false);
        }
        else if(result.length > 0){
            // console.log("Product already in cart");
            return res.send(true);
        }
    } catch (err) {
        console.log("Failed to check if product exists in cart", err);
    }

}

const getCartItems = async (req,res) =>{
    const { user_id } = req.query;
    try{
        const result = await queryCartItems(user_id);
        if(result.length > 0){
            return res.json(result);
        }
        else{
            return res.send(false);
        }
    } catch(err) {
        console.log("Failed to fetch cart items", err);
    }
}

const getCategoryProducts = async (req,res) =>{
    const { category_name } = req.query;
    try{
        const result = await queryCategoryProducts(category_name);
        if(result.length > 0){
            
            return res.json(result);
        }
        else{
            return res.send(false);
        }
    } catch(err) {
        console.log("Failed to fetch category products", err);
    }
    
}
const removeCartItem = async (req,res) =>{
    const { user_id, item_id } = req.query;
    try{
        const result = await deleteCartItem(user_id,item_id);
        if(result.length > 0){
            return res.send(true);
        }
        else{
            return res.send(false);
        }

    } catch(err){
        console.log("Failed to remove cart item", err);
    }
}

const updateCartQuantity = async (req,res) =>{
    const { user_id,item_id,quantity } = req.body;

    try{
        const result = await updateItemQuantity(user_id,item_id,quantity);
        return res.send(result);
    } catch(err){
        console.log("Failed to update cart item quantity", err);
    }
}

const getAddress = async (req,res) =>{
    const { user_id } = req.query;
    try{
        const result = await fetchAddress(user_id);
        return res.json(result);
    } catch(err){
        console.log("Failed to get user address", err);
    }
}

const pushNewAddress = async (req,res) =>{
    const { userId,firstname,lastname,address,country,postalCode,city,provance } = req.body;
    try{
        const result = await addNewAddress(userId,firstname,lastname,address,country,postalCode,city,provance);
        res.json(result);
    }catch(err){
        console.log("Failed to push address to database", err);
    }
}

const addNewOrder = async (req,res) =>{
    const { user_id, shipping_address,cartData } = req.body;
    try{
        const result = await createNewOrder(user_id, shipping_address,cartData);
        res.json(result);
    }catch(err){
        console.log("Failed to create a new order", err);
    }
    
}

const getOrders = async (req,res) =>{
    const { user_id } = req.query;
    try{
        const response = await fetchOrders(user_id);
        res.status(200).json(response);
    } catch(err){
        console.log('Error getting orders from database');
    }


}

module.exports = {
    registerRoute,
    isLoggedIn,
    getProducts,
    addToCart,
    checkCart,
    getCartItems,
    getCategoryProducts,
    removeCartItem,
    updateCartQuantity,
    getAddress,
    pushNewAddress,
    addNewOrder,
    getOrders,
    changeUserInfo
}