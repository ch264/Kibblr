const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ReviewSchema = new Schema ({
    date: Date,
    rating: Number,
    text: String
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;