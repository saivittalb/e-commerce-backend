'use strict';

// import mongoose
const mongoose = require("mongoose");

// declare schema and assign Schema class
const Schema = mongoose.Schema;

// create Schema instance and add schema properties
const ProductSchema = new Schema({
    productId: {
        type: String,
        required: true,
        index: { 
            unique: true 
        }
    },
    category: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productModel: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) throw new Error("Negative price isn't real.");
        }
    },
    availableQuantity: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Negative quantity isn't real.");
        }
    }
});

// create and export model
module.exports = mongoose.model("model", ProductSchema);
