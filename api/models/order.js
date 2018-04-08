var mongoose = require('mongoose')
autoIncrement = require('mongoose-auto-increment');
mongoose.connect('mongodb://localhost:27017/shopDB');

var db = mongoose.connection;
autoIncrement.initialize(db);


var Schema = mongoose.Schema;

var orderSchema = new Schema({
    items: [],
    date: { type: String },
    totalPrice: { type: String },
})

autoIncrement.initialize(db);

orderSchema.plugin(autoIncrement.plugin, { model: 'Order', field: 'orderNumber' });

var Order = mongoose.model('Order', orderSchema);






module.exports = { Order }