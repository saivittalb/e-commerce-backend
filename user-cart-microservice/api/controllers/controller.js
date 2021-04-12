// import model
const UserCart = require("../models/model");

const fetch = require('node-fetch');

// listCart function - To get all products in the cart
exports.listUserCart = async (req, res) => { 
    await UserCart.find({ userId: req.params.id }, (err, cart) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(cart);
    });
};

// createNewUser function - To create new users with empty cart (only for my reference, not exposed to the user)
exports.createNewUser = async (req, res) => {
    let newUser = new UserCart (req.body);
    await newUser.save ((err, cart) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(cart);
    });
};

// createUpdateUserCart function - To create/update user cart status by user id
exports.createUpdateUserCart = (req, res) => {
    var amount, name

    // fetching Product microservice to get all products
    fetch(`http://localhost:3000/rest/v1/products/`, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
    .then(response => response.json())
    .then(response => {
        let pCount = 0
        for (var i = 0; i < response.length; i++) {
            if (response[i].productId == req.body.productId) {
                pCount += 1
                if ((response[i].availableQuantity - req.body.quantity) <= 0) {
                    req.body.quantity = response[i].availableQuantity    //setting quantity to available quantity if it exceeds
                }
                //updating amount and getting the product name
                amount = req.body.quantity * response[i].price
                name = response[i].productName
            } 
        }
        // validating the productId
        if (pCount == 0) {
            throw new Error("productId not found.")
        }

        // updating the request with amount and product name
        req.body = { productId: req.body.productId, productName: name, quantity: req.body.quantity, amount: amount }

        // fetching user cart to check if the product is already in the cart
        fetch(`http://localhost:4000/rest/v1/users/${req.params.id}/cart`, {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
        .then(responseCart => responseCart.json())
        .then(responseCart => {
            let cCount = 0
            for (var i = 0; i < responseCart[0].cart.length; i++) {
                if (responseCart[0].cart[i].productId == req.body.productId) {
                    cCount += 1
                } 
            }
            // if product already exists, update it
            if (cCount >= 1 && req.body.quantity != 0) {
                UserCart.findOneAndUpdate({ "userId": req.params.id, "cart.productId": req.body.productId }, { "cart.$": req.body }, { new: true }, (err, cart) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(cart.cart);
                });
            } 
            // if product doesn't exist, add it
            if (cCount == 0 && req.body.quantity != 0) {
                UserCart.findOneAndUpdate({ userId: req.params.id }, { $addToSet: { "cart": req.body } }, { new: true }, (err, cart) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(cart.cart);
                });
            }
            // if product exists, but new quantity is zero then, delete it
            if (cCount >= 1 && req.body.quantity == 0) {
                UserCart.findOneAndUpdate({ "userId": req.params.id, "cart.productId": req.body.productId }, { $pull: { "cart": { "productId": req.body.productId } } }, { new: true }, (err, cart) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(cart.cart);
                });
            }
            // if product doesn't exist and quantity is zero
            if (cCount == 0 && req.body.quantity == 0) {
                throw new Error ("Quantity cannot be zero for items not in cart.")
            }
        });
    });
};
