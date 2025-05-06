const mongoose= require("mongoose")
const AutoIncrement=require("mongoose-sequence")(mongoose)

const RequiestSchema= new mongoose.Schema({
    requiest_id:{
        type:Number,
        require:true,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    property_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Property',
        require:true
    }
},{timestamps:true})

RequiestSchema.plugin(AutoIncrement,{inc_field:"requiest_id"})
module.exports= mongoose.model("Requiest",RequiestSchema);

