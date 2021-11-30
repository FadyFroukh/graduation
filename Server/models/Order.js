const mongoose = require("../Connection");

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
    table:{
        type:mongoose.ObjectId,
        required:true,
        ref:"User",
    }
})

const Order = mongoose.model("Order",itemSchema);

module.exports = Order;