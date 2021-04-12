'use strict'

// import DB connection
require("./config/db");

// require express
const express = require("express");

// create express app
const app = express();

// import API route
var routes = require('./api/routes/routes'); //importing route

// define port to run express app
const port = process.env.PORT || 4000;

// use middleware on express app
app.use(express.json());

routes(app);

// Add endpoint
app.get('/', (req, res) => {
    res.send("User Cart Microservice. Refer provided documentation for usage.");
});

// Listen to server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
