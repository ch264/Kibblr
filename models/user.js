const mongoose = require('mongoose');
let Schema = mongoose.Schema;

    const UserSchema = new Schema ({
        name: String,
        email: String,
        password: String,
        username: String
    });

    var User = mongoose.model('User', UserSchema);

    module.exports = User;