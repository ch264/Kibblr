<<<<<<< HEAD
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    // Review = require('./review');
=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
>>>>>>> 02038181cbfc71bc3f7ac536a0fd532b47837223

let PlaceSchema = new Schema({
    name: String,
    type: String,
<<<<<<< HEAD
    review: String,
    address: String
    // rating: Number
=======
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    address: String,
    rating: Number
>>>>>>> 02038181cbfc71bc3f7ac536a0fd532b47837223
})

var Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;