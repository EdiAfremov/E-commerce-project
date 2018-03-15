const express = require('express');
const { Orders } = require('../models/order')
const router = express.Router();
var _ = require('lodash');


let products = [];
let counter = []

router.post('/', function (req, res) {
  products.push(req.body[0]);
  counter.push(req.body[1]);
});

router.get('/', function (req, res) {
  let totalPrice = _.uniqBy(products, 'price');
  res.send(products);
});

router.post('/updateBag', function (req, res) {
  products = [];
  products.push(...req.body);
  res.send(products);
});

router.get('/updateBagIcon', function (req, res) {
  let sum = counter.reduce((a, b) => a + b, 0);
  res.send(counter);
});




module.exports = router;
