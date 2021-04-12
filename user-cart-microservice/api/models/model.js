'use strict';

// import mongoose
const mongoose = require("mongoose");

// declare schema and assign Schema class
const Schema = mongoose.Schema;

// create Schema instance and add schema properties
const CartSchema = new Schema ({
    productId: {
        type: String,
        default: ' ',
        required: true,
    },
    productName: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Negative quantity isn't real.");
        }
    },
    amount: {
        type: Number,
        validate(value) {
            if (value < 0) throw new Error("Negative amount isn't real.");
        }
    }
}, 
{ 
    _id : false 
});

// create Schema instance and add schema properties
const UserCartSchema = new Schema ({
    userId: {
        type: String,
        required: true,
        index: { 
            unique: true 
        }
    },
    cart: [CartSchema]
});

// create and export model
module.exports = mongoose.model("model", UserCartSchema);
