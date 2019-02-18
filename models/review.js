const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Place = require('./place');

let ReviewSchema = new Schema({
    date: Date,
    rating: Number,
    username: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    Place: { type: Schema.Types.ObjectId, ref: 'Place' }
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;