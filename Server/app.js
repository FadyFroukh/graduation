const express = require("express");
const mongo = require("mongodb");
const cors = require("cors");

const Meal = require("./models/Meal");
const Order = require("./models/Order");
const User = require("./models/User");

const mongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;
const app = express();
const port = 4000 || process.env.PORT;
const url = "mongodb+srv://Fadi:12345@graduation.aovk2.mongodb.net/graduation?retryWrites=true&w=majority";


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors({
  origin:"*"
}))

app.get("/",(req,res)=>{
  res.json({
    "Welcome":"Welcome to the Restaurent API",
  })
})

// Login Endpoint

app.post("/login",(req,res)=>{
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("graduation");
    dbo.collection("users").find({name:req.body.name , password:req.body.password}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  }); 
})


//Users Endpoints

app.get("/users",(req,res)=>{
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("graduation");
    dbo.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  }); 
});

app.post("/users",(req,res)=>{ 
    const user = new User({
      name:req.body.username,
      password:req.body.password,
      rule:req.body.rule,
      status:req.body.status,
      orders:[]
    });

    mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("graduation");
      dbo.collection("users").insertOne(user,function(err, result) {
        if (err) throw err;
        res.send(result)
        db.close();
      });
    });
  
})

app.put("/users", async (req,res)=>{
  var user = await User.findByIdAndUpdate(ObjectId(req.body.id),{
    name:req.body.name,
    password:req.body.password,
    rule:req.body.rule
  })
})

app.delete("/users/:id", async (req,res)=>{
  const user = await User.findById(req.params.id);
  await User.deleteOne(ObjectId(user.id));
})

//Tables Endpoints

app.get("/tables",(req,res)=>{
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("graduation");
    dbo.collection("users").find({rule:0}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  }); 
});

app.get("/tables/:id",async (req,res)=>{
  
  var table = await User.findById(req.params.id).populate("orders"); 
  res.send(table);

});

app.put("/tables", async (req,res)=>{
  var user = await User.findByIdAndUpdate(ObjectId(req.body.id),{status:!req.body.status});
})

//Meals Endpoints

app.get("/meals",async (req,res)=>{
    var meals = await Meal.find({});
    res.send(meals)
})

app.get("/meals/:id",async (req,res)=>{
  const meal = await Meal.findById(ObjectId(req.params.id));
  res.send(meal);
})

app.post("/meals",(req,res)=>{

  const meal = Meal(
    {
      itemName:req.body.itemName,
      itemCat:req.body.itemCat,
      itemPrice:req.body.itemPrice,
      itemInfo:req.body.itemInfo,
      itemIngds:req.body.itemIngds
    }
  )
  console.log(meal);

  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("graduation");
    dbo.collection("meals").insertOne(meal,function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });

})

app.put("/meals", async (req,res)=>{
  var meal = await Meal.findByIdAndUpdate(ObjectId(req.body.id),{
    itemName:req.body.mealName,
    itemCat:req.body.mealCat,
    itemPrice:req.body.mealPrice,
    itemInfo:req.body.mealInfo,
    itemIngds:req.body.ingds
  });
})


app.delete("/meals/:id", async (req,res)=>{
  const meal = await Meal.findById(req.params.id);
  await Meal.deleteOne(ObjectId(meal.id));
})

//Orders Endpoints

app.get("/orders",(req,res)=>{

    mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("graduation");
      dbo.collection("orders").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result)
        db.close();
      });
    }); 

})

app.get("/orders/:id", async (req,res)=>{
  const orders = await Order.find({table:req.params.id});
  res.send(orders);
})

app.post("/orders",async (req,res)=>{

  const item = new Order({
    itemName:req.body.itemName,
    itemPrice:req.body.itemPrice,
    addedAt:req.body.addedAt,
    table:ObjectId(req.body.table),
    ingds:req.body.ingds
  });

  await item.save();

   const  user = await User.findById(req.body.table);
   user.orders.push(ObjectId(item._id));
   await  user.save();
   res.send(item);

})

app.delete("/orders/:id", async (req,res)=>{
    const order = await Order.findById(req.params.id);
    const user = await User.findById(order.table);
    var index = user.orders.findIndex(a => a == order.id);
    user.orders.splice(index, 1);
    user.save();
    await Order.deleteOne(ObjectId(order.id));
})


//Listening for the port

app.listen(port,()=>{
    console.log(`Listening on port : ${port}`);
})

