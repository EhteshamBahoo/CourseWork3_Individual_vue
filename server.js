
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const port = process.env.port||3000;
const fs = require("fs")
const path = require("path")
const cors = require("cors")

const client = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

// const uri = "mongodb+srv://ehteshambahoo9023:mangodb1101@webstore01.54bc9pb.mongodb.net/";
const uri = "mongodb+srv://codingchitala:joel1990@cluster0.lripehw.mongodb.net";

let db; // Declare a variable to store the database connection

// Connect to the database
client.connect(uri,(err,cli)=>{
    db = cli.db('Ehtesham'); // Assign the database connection to the 'db' variable
});
// Connect to the database
app.use(cors())
app.use(express.json());

// Custom middleware to log request information
app.use((req,res,next)=>{
    let dt = new Date();
    let formatted_date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
    let formatted_log = `[${formatted_date}] ${req.method}:${req.url} ${res.statusCode}`;
    console.log(formatted_log); // Log the formatted request information
    next() // Move to the next middleware or route handler
});

app.param('collectionName',(req,res,next,collectionName)=>{
    if (db != undefined) {
        req.collection = db.collection(collectionName);
    }
    return next()
})

app.get('/collection/:collectionName', (req, res) => {
    req.collection.find({}).toArray((e,results)=>{
        if (e) return next(e);
        res.send(results)
    })
});

app.listen(port, () => {
    console.log(`Server is running on port http://127.0.0.1:${port}`);
});