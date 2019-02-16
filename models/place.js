let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let PlaceSchema = new Schema({
    name: String,
    type: String,
    review: [ReviewSchema],
    address: String,
    rating: Number
})

var Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;