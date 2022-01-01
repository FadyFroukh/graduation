const mongoose = require("../Connection");

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
        },
        itemInfo:{
            type:String,
            required:true,
            trim:true
        },
        itemIngds:{
            type:Array,
            required:false,
            trim:true
        }
    }
)

const Meal = mongoose.model("Meal",mealSchema);

module.exports = Meal;