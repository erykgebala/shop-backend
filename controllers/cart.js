const Product = require("../model/product");

exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(userData => {
        res.status(200).send(userData.cart.items)
    }).catch(err => {
        res.status(500).send(err)
    });
}

exports.addProductToCart =  (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product);
    }).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    });
}

exports.removeProductFromCart = (req, res, next) => {
    const prodId = req.params.productId;
    return req.user.removeFromCart(prodId)
    .then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    });
}