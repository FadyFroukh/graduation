const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Fadi:12345@graduation.aovk2.mongodb.net/graduation?retryWrites=true&w=majority");

module.exports = mongoose;