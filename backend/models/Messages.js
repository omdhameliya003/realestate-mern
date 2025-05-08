const mongoose= require("mongoose")
const AutoIncrement= require("mongoose-sequence")(mongoose)
const User = require("./User")


const messageSchema= new mongoose.Schema({
    message_id:{
        type:Number,
        require:true,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    user_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    message:{
        type:String,
        maxlength: 1000,
        require:true
    }

},{timestamps:true})

messageSchema.plugin(AutoIncrement,{inc_field:'message_id'});

module.exports= mongoose.model('Message',messageSchema);