let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/book-app');

module.exports = {
    Place: require('./place'),
    User: require('./user'),
    Review: require('./review')
};