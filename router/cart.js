const express = require('express')
const CartController = require('../controllers/cart')
const router = express.Router();

//get cart
router.get("/cart", CartController.getCart);

//add product to cart
router.post("/cart", CartController.addProductToCart);

//remove product from cart
router.delete('/cart/:productId', CartController.removeProductFromCart)

module.exports = router;