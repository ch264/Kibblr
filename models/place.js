const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

let PlaceSchema = new Schema({
    name: String,
    type: String,
    address: String,
    rating: Number,
    url: String
})

var Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;