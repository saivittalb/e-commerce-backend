# E-Commerce Demo Backend
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com) 
[![GitHub followers](https://img.shields.io/github/followers/saivittalb.svg?style=social&label=Follow)](https://github.com/saivittalb?tab=followers) 
[![Twitter Follow](https://img.shields.io/twitter/follow/saivittalb.svg?style=social)](https://twitter.com/saivittalb)

An e-commerce backend with two microservices designed to facilitate functionality for the shopping cart. Designs are based on a fictional scenario. 

Tech stack used – MongoDB, Express, and Node.js.

More info regarding the assignment can be found in ```Design Specifications.pdf``` file and a brief report can be found in ```ESA Assignment-2.docx```.

Developed as a part of an assignment for the course CS 474 – Enterprise Software Architecture.

###### Note 
Following versions were used in the development of this demo:
- ```Node.js``` 14.15.4.
- ```Node Package Manager (npm)``` 7.9.0.
- Editor used was Visual Studio Code 1.55.1.

## Table of contents
* [License](#license)
* [Instructions to setup locally](#instructions-to-setup-locally)
    * [Installing modules](#installing-modules)
    * [Running the servers](#running-the-servers)
    * [Testing the APIs](#testing-the-apis)
* [APIs and their behavior](#apis-and-their-behavior)
    * [Product Microservice](#product-microservice)
        * [Create a new product](#create-a-new-product)
        * [Retrieve list of products](#retrieve-list-of-products)
        * [Update a product](#update-a-product)
        * [Delete a product](#delete-a-product)
    * [User Cart Microservice](#user-cart-microservice)
        * [Create a new user with empty cart](#create-a-new-user-with-empty-cart)
        * [Create or Update cart item](#create-or-update-cart-item)
        * [Retrieve user cart](#retrieve-user-cart)
* [Validations](#validations)
* [Contributing](#contributing)

## License
This project is licensed under the MIT License, a short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

<p align="center"> Copyright (c) 2021 Sai Vittal B. All rights reserved.</p>

## Instructions to setup locally
### Installing modules
- Run the following commands in the terminal/console window in the project directory:
```bash
$ cd product-microservice

$ npm install

$ cd ..

$ cd user-cart-microservice

$ npm install
```

### Running the servers
- Setup a MongoDB Atlas cluster under free tier plan and create a ```.env``` file in ```project-microservice``` and ```user-cart-microservice``` folders under the following schema:
```
MONGODB_URI="<YOUR-CONNECTION-STRING-HERE>"
```
###### Note
Databases for both the microservices must be different. Specify the database in your cluster when defining the URI.
- You can also use my credentials for ```.env``` file which is provided in the ```ESA Assignment-2.docx``` file. Use responsibly and don't spam my database.
- Run the following commands in the terminal/console window to run Product Microservice:
```bash
$ cd product-microservice

$ node server.js
```
- Run the following commands in the terminal/console window to run User Cart Microservice:
```bash
$ cd user-cart-microservice

$ node server.js
```
- In case if you want to run the application dynamically whenever file changes in the directory are detected, replace ```node``` with ```nodemon```. For example,
```bash
$ nodemon server.js
```

### Testing the APIs
You can test the microservices with Postman by importing the provided collections into your Postman client. They were exported via Postman Collection v2.1 in JSON format.

## APIs and their behavior
### Product Microservice
#### Create a new product
This API will not be exposed to the client. Only for administrative purposes.

Method – POST
Route – ```http://localhost:3000/rest/v1/products```

This will create a new product in the database.

Example request body:
```bash
{
    "productId": "123245ds4234",
    "category": "TV",
    "productName": "Sony",
    "productModel": "Bravia",
    "price": 1200,
    "availableQuantity": 6
}
```

Example successful response:
```bash
{
    "availableQuantity": 6,
    "_id": "607473b0a3e93b68f3e5ea88",
    "productId": "123245ds4234",
    "category": "TV",
    "productName": "Sony",
    "productModel": "Bravia",
    "price": 1200,
    "__v": 0
}
```

#### Retrieve list of products
This API is exposed to the client.

Method – GET
Route – ```http://localhost:3000/rest/v1/products```

This will list all the available products in the database.

Example successful response:
```bash
[
    {
        "availableQuantity": 10,
        "_id": "60730d1db4e27351a5a3b3ab",
        "productId": "12445dsd234",
        "category": "Mobile",
        "productName": "Samsung",
        "productModel": "Galaxy Note",
        "price": 700,
        "__v": 0
    },
    {
        "availableQuantity": 6,
        "_id": "607473b0a3e93b68f3e5ea88",
        "productId": "123245ds4234",
        "category": "TV",
        "productName": "Sony",
        "productModel": "Bravia",
        "price": 1200,
        "__v": 0
    }
]
```

#### Update a product
This API will not be exposed to the client. Only for administrative purposes.

Method – PUT
Route – ```http://localhost:3000/rest/v1/products/<product-id-here>```

This will find a product by provided id param and will update that product in the database.

Example request body:
```bash
{
    "productId": "123245ds4234",
    "category": "TV",
    "productName": "Sony",
    "productModel": "Bravia",
    "price": 1200,
    "availableQuantity": 6
}
```

Example successful response:
```bash
{
    "availableQuantity": 6,
    "_id": "607473b0a3e93b68f3e5ea88",
    "productId": "123245ds4234",
    "category": "TV",
    "productName": "Sony",
    "productModel": "Bravia",
    "price": 1200,
    "__v": 0
}
```

#### Delete a product
This API will not be exposed to the client. Only for administrative purposes.

Method – DELETE
Route – ```http://localhost:3000/rest/v1/products/<product-id-here>```

This will find a product by provided id param and will delete that product in the database.

Example successful response:
```bash
{
    "message": "Product successfully deleted."
}
```

### User Cart Microservice
#### Create a new user with empty cart
This API will not be exposed to the client. Only for administrative purposes. Design specified needed hard-coded users by the administrator.

Method – POST
Route – ```http://localhost:4000/rest/v1/users/```

This will create a new user with an empty cart. If the user already exists, it returns an error.

Example request body:
```bash
{
    "userId": "test-user-1"
}
```

Example successful response:
```bash
{
    "_id": "6073db9d7f5f2161f09cefdd",
    "userId": "test-user-1",
    "cart": [],
    "__v": 0
}
```

#### Create or Update cart item
This API is exposed to the client.

Method – PUT
Route – ``http://localhost:4000/rest/v1/users/<userId>/cart```

This will add a product to the cart if it doesn't exist or update the cart with the latest quantity if it exists. Also, connects with the Product Microservice API and validates the input quantity with the available quantity, and returns the product name and its amount. The amount is calculated by multiplying the product price with the quantity. 

If the input quantity is more than the available quantity, the cart will be updated with the available quantity.

Example request body:
```bash
{
    "productId": "12445dsd234",
    "quantity": 2
}
```

Example successful response:
```bash
[
    {
        "productId": "123245ds4234",
        "quantity": 2,
        "productName": "Sony",
        "amount": 2400
    },
    {
        "productId": "12445dsd234",
        "quantity": 2,
        "productName": "Samsung",
        "amount": 1400
    }
]
```

#### Retrieve user cart
This API is exposed to the client.

Method – GET
Route – ```http://localhost:4000/rest/v1/users/<userId>/cart```

This will retrieve the user cart for a userId provided in the database.

Example successful response:
```bash
[
    {
        "_id": "6073db9d7f5f2161f09cefdd",
        "userId": "test-user-1",
        "cart": [
            {
                "productId": "123245ds4234",
                "quantity": 2,
                "productName": "Sony",
                "amount": 2400
            },
            {
                "productId": "12445dsd234",
                "quantity": 2,
                "productName": "Samsung",
                "amount": 1400
            }
        ],
        "__v": 0
    }
]
```

## Validations
All the APIs perform necessary validations as per the provided design specifications. Along with this, other extra validations are performed in some APIs and the database schema. These validations are self-explainable and can be seen in the codebase with comments wherever required.

All the corner cases are addressed appropriately. If you discover any failing test cases, you are encouraged to open an issue or a PR regarding it.

## Contributing
- Fork this project by clicking the ```Fork``` button on the top right corner of this page.
- Open terminal/console window. 
- Clone the repository by running the following command in git:
 ```bash
$ git clone https://github.com/[YOUR-USERNAME]/e-commerce-backend.git
```
- Add all changes by running this command.
```bash
$ git add .
```
- Or to add specific files only, run this command.
```bash
$ git add path/to/your/file
```
- Commit changes by running these commands.
```bash
$ git commit -m "DESCRIBE YOUR CHANGES HERE"

$ git push origin
```
- Create a Pull Request by clicking the ```New pull request``` button on your repository page.

[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/saivittalb/) 
[![ForTheBadge powered-by-electricity](http://ForTheBadge.com/images/badges/powered-by-electricity.svg)](http://ForTheBadge.com)

<p align="center"> Copyright (c) 2021 Sai Vittal B. All rights reserved.</p>
<p align="center"> Made with ❤ by <a href="https://github.com/saivittalb">Sai Vittal B</a></p>
