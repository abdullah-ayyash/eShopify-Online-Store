const express = require('express');
const router = express.Router();
const passport = require("passport");
const { loginRoute, registerRoute, isLoggedIn,getProducts,addToCart,checkCart
  ,getCartItems,getCategoryProducts,removeCartItem } = require('./utils')

router.post('/login', passport.authenticate('local'), loginRoute);

router.post("/register", registerRoute);

router.get("/register", (req, res) => {
  res.send("Hello this is working");
});

router.get('/profile', isLoggedIn);

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).send();
  });
});

router.get('/products', getProducts);

router.post('/add-to-cart',addToCart);

router.get('/cart-check',checkCart);

router.get('/cart-items',getCartItems);

router.get('/category-products',getCategoryProducts);

router.delete('/cart-item',removeCartItem);

module.exports = router;