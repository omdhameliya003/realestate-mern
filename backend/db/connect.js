const mongoose = require('mongoose');

var conn = mongoose.connect("mongodb://localhost:27017/realestate", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

if(conn){
    console.log("connected..")
}
