let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    User = require('./user');
    Place = require('./place');

let ReviewSchema = new Schema ({
    date: Date,
    rating: Number,
    username: {type: Schema.Types.ObjectId, ref: 'User'},
    text: String,
    place: {type: Schema.Types.ObjectId, ref: 'Place'}
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;