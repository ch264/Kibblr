let mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/kibblr');

module.exports = {
    Place: require('./place'),
    User: require('./user'),
    Review: require('./review')
};