const express = require('express');
var { mongoose } = require('./../db/mongoose')
var { Clothing } = require('./../models/clothingModel')
const { ObjectID } = require('mongodb')
var _ = require('lodash');

const router = express.Router();


router.post('/', function (req, res, next) {

  var clothing = new Clothing({
    type: req.body.type,
    price: req.body.price,
    brand: req.body.brand,
    discount: req.body.discount,
    size: req.body.size,
    selectedSize: req.body.selectedSize,
    color: req.body.color,
    image: `http://localhost:3001/images/${req.body.image}`,
    bigImage: `http://localhost:3001/images/${req.body.bigImage}`
  })

  clothing.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err);
  })
});

router.get('/', function (req, res, next) {
  let data = {}
  Clothing.find().count().then((count) => {
    data.count = count;
  })

  Clothing.find({ "discount": 0 }).then((clothes) => {
    data.clothes = clothes;
    res.send(data);
  }, (err) => {
    res.status(400).send({ err })
  })

});

router.get('/suits', function (req, res, next) {

  Clothing.find({ type: 'Suit' }).then((products) => {
    if (!products) {
      return res.status(404).send()
    }
    res.send({ products })
  })
})

router.get('/:sortBy', function (req, res, next) {
  let data = {}
  Clothing.find().count().then((count) => {
    data.count = count;
  })

  Clothing.find({ "discount": 0 }).then((clothes) => {
    data.clothes = clothes;
    let sortArr = _.filter(data.clothes, { 'brand': req.params.sortBy });
    if (!sortArr) {
      res.send(data)
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

  Clothing.findById(id).then((product) => {
    if (!product) {
      return res.status(404).send()
    }
    res.send({ product })
  })
})

router.get('/search/:brand', function (req, res, next) {
  let brand = req.params.brand
  Clothing.find({ brand }).then((products) => {
    if (!products) {
      return res.status(404).send()
    }
    res.send({ products })
  })
})

router.get('/search/type/:type', function (req, res, next) {
  let type = req.params.type
  Clothing.find({ type: type }).then((products) => {
    if (!products) {
      return res.status(404).send()
    }
    res.send({ products })
  })
})



module.exports = router;
