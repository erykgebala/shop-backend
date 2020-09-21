const Product = require("../model/product");

exports.getProducts =  (req, res, next) => {
    Product.find()
    .populate("userId", "name")
    .then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    });
}

exports.addProduct =  (req, res, next) => {
    Product.create({...req.body, userId: req.user}).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    });
}

exports.getProduct =  (req, res, next) => {
    Product.findById(req.params.productId).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    });
}

exports.deleteProduct =  (req, res, next) => {
    Product.findByIdAndDelete(req.params.productId).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    });
}

exports.updateProduct =  (req, res, next) => {
    Product.findById(req.params.productId).then(product => {
        product.name = req.body.name;
        product.price = req.body.price;
        product.imageUrl = req.body.imageUrl;
        product.desc = req.body.desc;
        return product.save();
    }).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    });
}