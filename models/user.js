const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    username: String,
    Review: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;