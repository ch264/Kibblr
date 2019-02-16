var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var AuthorSchema = new Schema ({
        name: String
    });

    var User = mongoose.model('User', UserSchema);

    module.exports = User;