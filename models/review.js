let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    User = require('./user');

let ReviewSchema = new Schema ({
    date: Date,
    rating: Number,
    username: {type: Schema.Types.ObjectId, ref: 'User'},
    review: String,
    restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'}
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;