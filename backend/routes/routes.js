const express = require('express');
const router = express.Router();
const passport = require("passport");
const { loginRoute, registerRoute, isLoggedIn,getProducts,addToCart,checkCart
  ,getCartItems,getCategoryProducts,removeCartItem,updateCartQuantity,getAddress,pushNewAddress,addNewOrder,getOrders,
  changeUserInfo
  } = require('./utils')

// Consider creating one router for authentication and one for fetching product info 

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

router.put('/update-user-info',changeUserInfo);

router.get('/products', getProducts);

router.post('/add-to-cart',addToCart);

router.get('/cart-check',checkCart);

router.get('/cart-items',getCartItems);

router.get('/category-products',getCategoryProducts);

router.delete('/cart-item',removeCartItem);
router.put('/cart-quantity', updateCartQuantity);

router.get('/get-address',getAddress);

router.post('/add-address',pushNewAddress);

router.post('/add-new-order',addNewOrder);

router.get('/get-orders',getOrders);

module.exports = router;