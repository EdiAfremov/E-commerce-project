var mongoose = require('mongoose')

var Liked = mongoose.model('likedItems', {
    id: {
        type: String,
    },
});

module.exports = { Liked }