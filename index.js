const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {Admin} = require('mongodb');
const bodyparser = require("body-parser");
const {userInfo} = require('os');
const env = require("dotenv").config();
app.use(express.json());
const userroute = require("./route/userroute");

const port = 8080;
//db_url="mongodb+srv://register:signin@cluster0.a9meatp.mongodb.net/test";
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const uri = process.env.db_url;
mongoose.connect(
    uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log("DB error",err);
});

app.use("/user",userroute);

app.listen(port,() => {
    console.log("App is listening port:8080");
});

