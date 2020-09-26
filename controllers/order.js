const Order = require("../model/Order");


exports.createOrder =  (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(userData => {
        const products = userData.cart.items.map((p) => {
            return {
                quantity: p.quantity,
                product: { ... p.productId._doc }
            }
        });
        if (products.length == 0) {
            return res.status(400).send();
        }
        Order.create({
            user: {
                name: req.user.name,
                userId: req.user,
            },
            products: products,
            state: 'CREATED'
        }).then(data => {
            return req.user.clearCart();
        }).then((data) =>{
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        });
    });
}

exports.getOrders =  (req, res, next) => {
    Order.find({'user.userId': req.user._id}).then((orders) =>{
        res.status(200).send(orders)
    })
    .catch(err => {
        res.status(500).send(err)
    });
}