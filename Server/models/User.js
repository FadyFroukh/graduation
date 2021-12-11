const mongoose = require("../Connection");
const Order = require("./Order")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true  
    },
    rule:{
        type:Number,
        required:true
    },

    status:{
      type:Boolean,
      required:true  
    },

     orders:{
         type: [{
             type: mongoose.ObjectId,
             ref: "Order"
         }],
         default: []
     }
})

const User = mongoose.model("User",userSchema);

module.exports = User;