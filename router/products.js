const express = require('express')
const ProductController = require('../controllers/products')
const router = express.Router();

//get product list
router.get("/products", ProductController.getProducts);

//add new product
router.post("/products", ProductController.addProduct);

//get product
router.get("/products/:productId", ProductController.getProduct);

//delete product
router.delete("/products/:productId", ProductController.deleteProduct);

//update product
router.patch("/products/:productId", ProductController.updateProduct);

module.exports = router;