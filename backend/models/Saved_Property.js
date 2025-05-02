const mongoose= require("mongoose")
const AutoIncrement=require("mongoose-sequence")(mongoose)


const Saved_PropertySchema= new mongoose.Schema({
    savedProperty_id:{
        type:Number,
        require:true
    },
    property_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property",
        require:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
},{timestamps:true})

Saved_PropertySchema.plugin(AutoIncrement,{inc_field:"savedProperty_id"})

module.exports= mongoose.model('Saved_Property',Saved_PropertySchema)