const mongoose = require('mongoose');
const dotenv=require("dotenv");
dotenv.config();

var conn = mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

if(conn){
    console.log("connected..")
}

module.exports= conn;