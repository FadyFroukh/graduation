const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
        trim:true
    },
    itemPrice:{
        type:Number,
        required:true,
        trim:true
    },
    addedAt:{
        type:Date,
        required:true,
        trim:true
    },
    tableID:{
        type:Number,
        required:true,
        trim:true
    }
})

const NewItem = mongoose.model("NewItem",itemSchema);

module.exports = NewItem;