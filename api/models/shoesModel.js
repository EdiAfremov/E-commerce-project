var mongoose = require('mongoose')

var Shoes = mongoose.model('shoes', {
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

module.exports = { Shoes }