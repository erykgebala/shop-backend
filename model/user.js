const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function(product) {
    const cartProdIndex = this.cart.items.findIndex(p => {
        return p.productId.toString() === product._id.toString()
    });
    const newCartItems = [...this.cart.items];
    if (cartProdIndex === -1) { //nieznaleziono produktu w koszyku
        newCartItems.push({
            productId: product._id,
            quantity: 1
        });
    } else { //jest juz taki produkt
        newCartItems[cartProdIndex].quantity++;
    }
    this.cart.items = newCartItems;

    return this.save();
}

userSchema.methods.removeFromCart = function(productId) {
    const newCartItems = this.cart.items.filter(p => {
        return p.productId.toString() !== productId.toString()
    });
    this.cart.items = newCartItems;
    return this.save();
}

userSchema.methods.clearCart = function() {
    this.cart.items = [];
    return this.save();
}

module.exports = mongoose.model('User', userSchema);