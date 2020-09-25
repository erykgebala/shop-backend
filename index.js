const express = require('express')
const cors = require('cors')
const mongoUrl = require('./mongoUrl')
const mongoose  = require('mongoose');
const productRouter = require('./router/products')
const cartRouter = require('./router/cart')
const orderRouter = require('./router/order')
const User = require("./model/user");

const url = mongoUrl;

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    User.findById('5f62621cf63d161b70cb685f').then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err)
    })
});

app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);

mongoose.connect(url,  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
     User.findById('5f62621cf63d161b70cb685f').then(userFromDb => {
         if (!userFromDb){
            const user = new User({
                name: "admin",
                email: "admin@wp.pl",
                cart: {
                    items: []
                }
            });
            user.save();
         }
     })

    app.listen(9000, () => {
        console.log("wystartowal")
    });
});
