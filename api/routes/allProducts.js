const express = require('express');
var { mongoose } = require('./../db/mongoose')
var { Clothing } = require('./../models/clothingModel')
var { Shoes } = require('./../models/shoesModel')
const { ObjectID } = require('mongodb')
var _ = require('lodash');
const router = express.Router();

let data = {}
let allProductsShuffeld;

Clothing.find().then((clothes, count) => {
    data.clothes = clothes;
}, (err) => {
    res.status(400).send({ err })
}).then(() => {
    Shoes.find().then((shoes, count) => {

        data.shoes = shoes;
        data.arr = data.shoes.concat(data.clothes)
        if (data.clothes) {
            allProductsShuffeld = _.shuffle(data.arr);
        }
    }, (err) => {
        res.status(400).send({ err })
    })
})

router.get('/', function (req, res, next) {
    res.send(data.arr)
});

router.get('/:sortBy', function (req, res, next) {

    let sortArr = _.filter(data.arr, { 'brand': req.params.sortBy });
    res.send(sortArr)
});

router.get('/lazy/:num', function (req, res, next) {
    if (isNaN(req.params.num)) {
        res.status(400).send()
    }
    let num = req.params.num

    let chnkeArr = _.chunk(allProductsShuffeld, 12);
    if (chnkeArr[num] === undefined) {
        res.status(400).send()
    } else {
        res.send(chnkeArr[num])
    }

});


module.exports = router;