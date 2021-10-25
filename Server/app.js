const express = require("express");
const mongo = require("mongodb");
const cors = require("cors");
const NewMeal = require("./models/NewMeal");
const NewItem = require("./models/NewItem");

const mongoClient = mongo.MongoClient;
const app = express();
const port = 3001 || process.env.PORT;
const url = "mongodb://localhost:27017/";

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors({
  origin:"http://localhost:3000"
}))


mongoClient.connect("mongodb://localhost:27017/graduation",function(err,db){
    if (err) throw err;
});

app.get("/admins",(req,res)=>{
    // res.header("Access-Control-Allow-Origin","http://localhost:3000")
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("graduation");
        dbo.collection("admins").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result)
          db.close();
        });
      }); 
})


app.get("/menu",(req,res)=>{
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("graduation");
        dbo.collection("menu").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result)
          db.close();
        });
      }); 
})

app.post("/menu",(req,res)=>{

  const meal = NewMeal(
    {
      itemName:req.body.itemName,
      itemCat:req.body.itemCat,
      itemPrice:req.body.itemPrice
    }
  )
  console.log(meal);

  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("graduation");
    dbo.collection("menu").insertOne(meal,function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });

})

app.get("/items",(req,res)=>{

    mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("graduation");
      dbo.collection("items").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result)
        db.close();
      });
    }); 

})

app.post("/items",(req,res)=>{

  const item = NewItem({
    itemName:req.body.itemName,
    itemPrice:req.body.itemPrice,
    addedAt:req.body.addedAt,
    tableID:req.body.tableID
  })

  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("graduation");
    dbo.collection("items").insertOne(item,function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });

})

app.delete("/items",(req,res)=>{

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").deleteOne({}, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  }); 
  
})

app.listen(port,()=>{
    console.log(`Listening on port : ${port}`);
})


