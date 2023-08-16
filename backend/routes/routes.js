const express = require('express');
const router = express.Router();
const passport = require("passport");
const { query ,body, validationResult } = require('express-validator');
const { registerRoute, isLoggedIn,getProducts,addToCart,checkCart
  ,getCartItems,getCategoryProducts,removeCartItem,updateCartQuantity,getAddress,pushNewAddress,addNewOrder,getOrders,
  changeUserInfo
  } = require('./utils')
const { loginInputValidate,LoginInputmiddleware,registerInputValidate,registerInputmiddleware } = require('./validation')


router.get('/',(req,res) =>{
  res.send('<h2>server is running on port 443...</h2>')
})

router.post('/login',loginInputValidate,LoginInputmiddleware, (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    // If authentication failed
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // If authentication succeeded, you can handle the successful login here
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});


router.post("/register",registerInputValidate, registerInputmiddleware, registerRoute);

router.get("/register", (req, res) => {
  res.send("Hello this is working");
});

router.get('/profile', isLoggedIn);

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
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