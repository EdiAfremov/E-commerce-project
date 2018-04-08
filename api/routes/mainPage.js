const express = require('express');
var { mongoose } = require('./../db/mongoose')
var { Clothing } = require('./../models/clothingModel')
var _ = require('lodash');

var _ = require('lodash');
const router = express.Router();

router.get('/', function (req, res, next) {
    const images = {
        suits: 'http://localhost:3001/images/suits.jpg',
        trends: 'http://localhost:3001/images/trends.jpg',
    }
    res.send(images);
})

router.get('/:type', function (req, res, next) {
    let data = {}
    const type = req.params.type

    if (type === 'mix') {
        Clothing.find({ type: { $ne: 'Suit' }, "discount": 0 }).then((clothes) => {
            let reserved = clothes.reverse()
            let chunkArr = _.chunk(clothes, 12);
            data.clothes = chunkArr[0];
            res.send(data);
        }, (err) => {
            res.status(400).send({ err })
        })


    } else {
        Clothing.find({ "type": type }).then((clothes) => {
            data.clothes = clothes;
            res.send(data);
        }, (err) => {
            res.status(400).send({ err })
        })
    }


});


module.exports = router;
