const express = require('express');
var { mongoose } = require('./../db/mongoose')
var { Shoes } = require('./../models/shoesModel')
const { ObjectID } = require('mongodb')
var _ = require('lodash');
const router = express.Router();


router.post('/', function (req, res, next) {
    var shoes = new Shoes({
        type: req.body.type,
        price: req.body.price,
        brand: req.body.brand,
        size: req.body.size,
        selectedSize: req.body.selectedSize,
        color: req.body.color,
        image: `http://localhost:3001/images/${req.body.image}`,
        bigImage: `http://localhost:3001/images/${req.body.bigImage}`
    })
    shoes.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err);
    })
});

router.get('/', function (req, res, next) {
    let data = {}

    Shoes.find().count().then((count) => {
        data.count = count;

    })

    Shoes.find().then((shoes) => {
        data.shoes = shoes;
        res.send(data);
    }, (err) => {
        res.status(400).send({ err })
    })
});

router.get('/:sortBy', function (req, res, next) {
    let data = {}
    Shoes.find().count().then((count) => {
        data.count = count;
    })
    Shoes.find().then((shoes) => {
        data.shoes = shoes;
        let sortArr = _.filter(data.shoes, { 'brand': req.params.sortBy });
        if (!sortArr) {
            res.send(data.arr)
        }
        res.send(sortArr);
    }, (err) => {
        res.status(400).send({ err })
    })
});

router.post('/:id', function (req, res, next) {
    let id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }
    Shoes.findById(id).then((product) => {
        if (!product) {
            return res.status(404).send()
        }
        res.send({ product })
    })
})
module.exports = router;
