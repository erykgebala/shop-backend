const express = require('express')
const router = express.Router();
const OrderController = require('../controllers/order')

//create order
router.post("/orders", OrderController.createOrder);

//get orders
router.get("/orders", OrderController.getOrders);

module.exports = router;