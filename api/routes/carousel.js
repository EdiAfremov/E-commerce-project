const express = require('express');
const router = express.Router();

var { Clothing } = require('./../models/clothingModel')
var { Shoes } = require('./../models/shoesModel')

const data = [
    {
        "_id": "5a9ef036acc4cc3d549dd5c4",
        "type": "Jogger",
        "price": 120,
        "brand": "Nike",
        "discount": 30,
        "size": [
            "40",
            "42",
            "44",
            "45"
        ],
        "selectedSize": "",
        "color": "black",
        "image": "http://localhost:3001/images/7150187-1-black.jpg",
        "bigImage": "http://localhost:3001/images/7150187-1-black.jpg",
        "__v": 0
    }, {
        "_id": "5a9d9e91a8c5e61538f80c6e",
        "type": "shirt",
        "price": 35,
        "brand": "Jack & Jones",
        "size": [
            "s",
            "m",
            "l",
            "xl"
        ],
        "selectedSize": "",
        "color": "navy",
        "image": "http://localhost:3001/images/jack.jpg",
        "bigImage": "http://localhost:3001/images/jack.jpg",
        "__v": 0,
        "discount": 0.0
    },

    {
        "_id": "5a9ee6ed32d83a1af44d51ae",
        "type": "Shoes",
        "price": 180,
        "brand": "Nike",
        "size": [
            "40",
            "42",
            "43",
            "44"
        ],
        "selectedSize": "",
        "color": "grey",
        "image": "http://localhost:3001/images/8177011-1-grey.jpg",
        "bigImage": "http://localhost:3001/images/8177011-1-grey.jpg",
        "__v": 0,
        "discount": 0.0,
        "discoutn": 0.0
    },
    {
        "_id": "5a9d98dd95a34f37e4a37460",
        "type": "jeans",
        "price": 330,
        "brand": "Diesel",
        "size": [
            "31",
            "32",
            "34",
            "36"
        ],
        "selectedSize": "31,32,34,36",
        "color": "black",
        "image": "http://localhost:3001/images/diesel.jpg",
        "bigImage": "http://localhost:3001/images/diesel.jpg",
        "__v": 0,
        "discount": 0.0
    },
    {
        "_id": "5aa44344de42a9229c588723",
        "type": "shoes",
        "price": 65,
        "brand": "Puma",
        "size": [
            "40",
            "42",
            "43",
            "44"
        ],
        "selectedSize": "",
        "color": "white",
        "image": "http://localhost:3001/images/7608286-1-white.jpg",
        "bigImage": "http://localhost:3001/images/7608286-1-white.jpg",
        "__v": 0,
        "discoutn": 0.0,
        "discount": 0.0
    },
    {
        "_id": "5a9d9e3aa8c5e61538f80c6d",
        "type": "shirt",
        "price": 55,
        "brand": "Hollister",
        "size": [
            "s",
            "m",
            "l",
            "xl"
        ],
        "selectedSize": "",
        "color": "light blue",
        "image": "http://localhost:3001/images/hollister.jpg",
        "bigImage": "http://localhost:3001/images/hollister.jpg",
        "__v": 0,
        "discount": 0.0
    },
    {
        "_id": "5a9da08aa8c5e61538f80c71",
        "type": "Jacket",
        "price": 120,
        "brand": "Nike",
        "size": [
            "s",
            "m",
            "l",
            "xl"
        ],
        "selectedSize": "",
        "color": "green",
        "image": "http://localhost:3001/images/nike-train.jpg",
        "bigImage": "http://localhost:3001/images/nike-train.jpg",
        "__v": 0,
        "discount": 0.0
    },
    {
        "_id": "5aa442e8de42a9229c588721",
        "type": "shoes",
        "price": 105,
        "brand": "adidas",
        "size": [
            "40",
            "42",
            "43",
            "44"
        ],
        "selectedSize": "",
        "color": "green",
        "image": "http://localhost:3001/images/8886885-1-green.jpg",
        "bigImage": "http://localhost:3001/images/8886885-1-green.jpg",
        "__v": 0,
        "discoutn": 0.0,
        "discount": 0.0
    }
]

router.get('/', function (req, res) {
    res.send(data)
});







module.exports = router;