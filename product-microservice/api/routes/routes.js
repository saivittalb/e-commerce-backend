'use strict';

// create App function
module.exports = function(app) {
    var productList = require('../controllers/controller');

    // productList Routes

    // get and post request endpoints
    app
    .route("/rest/v1/products")
    .get(productList.listAllProducts)
    .post(productList.createNewProduct);

    // delete request endpoint
    app
    .route("/rest/v1/products/:id")
    .put(productList.updateProduct)
    .delete(productList.deleteProduct);
};
