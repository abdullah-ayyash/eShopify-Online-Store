
const { userExists, addNewUser, queryProducts, cartExists, 
    pushToCart, queryCartItems,queryCategoryProducts } = require('../database/database')
const bcrypt = require("bcrypt");

const loginRoute = (req, res) => {
    res.json(req.user);
}

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

        res.status(201).json(newUserReq);



    } catch (err) {
        res.status(500).json({ message: err.message });
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
            console.log("Product already in cart");
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

module.exports = {
    loginRoute,
    registerRoute,
    isLoggedIn,
    getProducts,
    addToCart,
    checkCart,
    getCartItems,
    getCategoryProducts
}