const express = require('express');
const { Order } = require('../models/order')
var { mongoose } = require('./../db/mongoose')

const router = express.Router();
var _ = require('lodash');


router.post('/', function (req, res) {

    var order = new Order({
        items: req.body.order,
        date: req.body.date,
    })

    order.save().then((doc) => {
        res.status(200).send()
    }).catch((e) => {
        res.status(400).send(e)
    })
});

router.get('/', function (req, res) {
    Order.find().then((ordersIDS) => {

        res.send(ordersIDS)

    })
});



module.exports = router;