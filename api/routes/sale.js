const express = require('express');
var { mongoose } = require('./../db/mongoose')
var { Clothing } = require('./../models/clothingModel')
var { Shoes } = require('./../models/shoesModel')
const { ObjectID } = require('mongodb')
const router = express.Router();


// router.post('/', function (req, res, next) {

// });

router.get('/', function (req, res, next) {
    let data = {}
    // Clothing.find({ "discount": { $gt: 0 } }).count().then((countClothes) => {

    // })
    // Shoes.find({ "discount": { $gt: 0 } }).count().then((countShoes) => {

    // })
    Clothing.find({ "discount": { $gt: 0 } }).then((clothes, count) => {
        data.clothes = clothes;
    }, (err) => {
        res.status(400).send({ err })
    }).then(() => {
        Shoes.find({ "discount": { $gt: 0 } }).then((shoes, count) => {
            data.shoes = shoes;
            data.arr = data.shoes.concat(data.clothes)
            if (data.clothes) {
                res.send(data)
            }
        }, (err) => {
            res.status(400).send({ err })
        })
    })




});
router.post('/:id', function (req, res, next) {
    let id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }
    let type = req.body.type
    if (type.toLowerCase() === 'shoes') {
        Shoes.findById(id).then((product) => {
            if (!product) {
                return res.status(404).send()
            }
            res.send({ product })
        })
    } else {
        Clothing.findById(id).then((product) => {
            if (!product) {
                return res.status(404).send()
            }
            res.send({ product })
        })
    }

})

module.exports = router;
