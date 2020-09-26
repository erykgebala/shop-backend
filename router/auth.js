const express = require('express')
const router = express.Router();
const AuthController = require('../controllers/auth')

//add product to cart
router.post("/login", AuthController.login);

module.exports = router;