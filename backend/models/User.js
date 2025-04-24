const mongoose= require("mongoose")

const userSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required: true,
        unique:true
    },
    fname:{
        type:String,
        required: true,
    },
    lname:{
        type:String,
        required: true,
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
    },
    password:
    {
        type:String,
        require:true
    }
},{timestamps:true ,versionKey:false});

module.exports=mongoose.model("User",userSchema);