const express = require('express');
const { Order } = require('../models/order')
var { mongoose } = require('./../db/mongoose')

const router = express.Router();
var _ = require('lodash');

function totalAmount(arr) {
    let uniqByItems = _.map(arr, 'items');

    let productArr = [];

    for (let i = 0; i < uniqByItems.length; i++) {
        let item = uniqByItems[i];
        item.forEach(pro => {
            productArr.push(pro)
        })
    }
    let total = []
    productArr.forEach(product => {
        total.push(product.price - product.discount)
    })
    return total.reduce((a, b) => {
        return a + b
    }, 0)
}

function itemsPerOrder(arr) {
    let uniqByItems = _.map(arr, 'items');
    let items = []
    for (let i = 0; i < uniqByItems.length; i++) {
        const element = uniqByItems[i];
        items.push(element.length)
    }
    let total = items.reduce((a, b) => {
        return a + b
    })
    return (total / uniqByItems.length).toFixed(2);
}
function averageOrder(arr) {
    let uniqByItems = _.map(arr, 'items');
    let productArr = [];

    for (let i = 0; i < uniqByItems.length; i++) {
        let item = uniqByItems[i];
        item.forEach(pro => {
            productArr.push(pro)
        })
    }
    let total = []
    productArr.forEach(product => {
        total.push(product.price - product.discount)
    })

    return total.reduce((a, b) => {
        return a + b
    }, 0) / total.length
}

function bestSeller(arr) {
    let uniqByItems = _.map(arr, 'items');
    let idsArr = _.flatten(uniqByItems);

    function mode(arr) {
        return arr.sort((a, b) =>
            arr.filter(v => v === a).length
            - arr.filter(v => v === b).length
        ).pop()
    }

    let bestItemID = mode(_.map(idsArr, '_id'));
    let bestSeller;
    for (let i = 0; i < uniqByItems.length; i++) {
        const id = uniqByItems[i];
        id.forEach(id => {
            if (id._id === bestItemID) {
                return bestSeller = id
            }
        })
    }
    return bestSeller
}



router.get('/', function (req, res) {
    let data = {}
    Order.find().then((orders) => {
        data.totalOrders = orders.length
        data.totalAmount = totalAmount(orders);
        data.itemsPerOrder = itemsPerOrder(orders);
        data.averageOrder = averageOrder(orders);
        data.bestSeller = bestSeller(orders);
        res.send(data)
    })
});



module.exports = router;



