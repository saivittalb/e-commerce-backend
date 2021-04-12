'use strict';

// create App function
module.exports = function(app) {
    var usersList = require('../controllers/controller');

    // usersList Routes

    // post request endpoint
    app
    .route("/rest/v1/users")
    .post(usersList.createNewUser)

    // get and put request endpoints
    app
    .route("/rest/v1/users/:id/cart")
    .get(usersList.listUserCart)
    .put(usersList.createUpdateUserCart);
};
