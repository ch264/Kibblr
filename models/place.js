let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    // Review = require('./review');

let PlaceSchema = new Schema({
    name: String,
    type: String,
    review: String,
    address: String
    // rating: Number
})

var Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;