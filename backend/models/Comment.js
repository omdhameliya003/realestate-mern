const mongoose= require("mongoose")
const AutoIncrement=require("mongoose-sequence")(mongoose)


const CommentSchema= new mongoose.Schema({
    comment_id:{
        type: Number,
        require:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }, 
    property_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Property',
        require:true
    },
    commentMessage:{
        type:String,
        require:true
    }
},{timestamps:true})

CommentSchema.plugin(AutoIncrement,{inc_field:"comment_id"})
module.exports=mongoose.model("Comment",CommentSchema);