const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
    {
        itemName:{
            type:String,
            required:true,
            trim:true
        },
        itemCat:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        itemPrice:{
            type:Number,
            required:true,
            trim:true
        }
    }
)

const NewMeal = mongoose.model("NewMeal",mealSchema);

module.exports = NewMeal;