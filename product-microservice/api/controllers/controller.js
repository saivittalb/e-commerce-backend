// import model
const Product = require("../models/model");

// listAllProducts function - To list all products
exports.listAllProducts = async (req, res) => { 
    await Product.find({}, (err, product) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(product);
    });
};

// createNewProduct function - To create new products (will not act as a downstream API, only for my reference, not exposed to the user)
exports.createNewProduct = async (req, res) => {
    let newProduct = new Product (req.body);
    await newProduct.save ((err, product) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(product);
    });
};


// updateProduct function - To update product status by id
exports.updateProduct = async (req, res) => {
    await Product.findOneAndUpdate({ productId: req.params.id }, req.body, { new: true }, (err, product) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(200).json(product);
    });
};    

// deleteProduct function - To delete products by id (will not act as a downstream API, only for my reference, not exposed to the user)
exports.deleteProduct = async (req, res) => {
    await Product.deleteOne({ productId: req.params.id }, (err) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(200).json({ message: "Product successfully deleted."});
    });
};
