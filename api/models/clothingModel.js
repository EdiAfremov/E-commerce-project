var mongoose = require('mongoose')

var Clothing = mongoose.model('clothing', {
    type: String,
    price: Number,
    discount: Number,
    brand: String,
    size: [String],
    selectedSize: String,
    color: String,
    image: String,
    bigImage: String,
});

module.exports = { Clothing }