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
    },
    ingds:{
        type:Array,
        required:false,
        trim:true
    }
})

const Order = mongoose.model("Order",itemSchema);

module.exports = Order;