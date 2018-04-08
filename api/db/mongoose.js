
var mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopDB');

var db = mongoose.connection;
autoIncrement.initialize(db);

db.on('error', function (err) {
    console.log(err);
});
db.once('open', function () {
    console.log('conncted to mongo');
});

module.exports = { mongoose }