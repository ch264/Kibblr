let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app");

module.exports = {
    Restaurant : require("./restaurant"),
    User : require("./user"),
    Review : require("./review")
}