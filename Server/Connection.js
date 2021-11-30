const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/graduation");

module.exports = mongoose;