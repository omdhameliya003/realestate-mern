const mongoose=require("mongoose");
const AutoIncrement =require("mongoose-sequence")(mongoose)



const PropertySchema= new mongoose.Schema({
    property_id:{
        type:Number,
        unique:true,
    },
    property_name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum: ['flat', 'house', 'shop', 'office'],
        required: true,
    },
    offer:{
        type:String,
        enum: ['sell', 'resell', 'rent'],
        required: true,
    },
    price:{
        type:Number,
        required:true
    },
    deposite:{
        type: Number,
    required: true,
    },
    address: {
        type: String,
        required: true,
      },
    city:{
        type: String,
        enum: ['surat', 'ahmedabad', 'rajkot', 'bhavnagar', 'vadodra'],
        required: true,
      },
    state:{
        type: String,
        default: 'gujarat',
      },
    status:{
        type: String,
        enum: ['ready to move', 'under construction'],
        required: true,
      },
    furnished: {
        type: String,
        enum: ['furnished', 'semi-furnished', 'unfurnished'],
        required: true,
         default: 'furnished'
      },
    bhk:{
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
         default: '1'
      },
    bedroom:{
        type: Number,
        enum: [0,1, 2, 3, 4, 5],
        required: true,
         default: '0'
      },
    bathroom:{
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
         default: '1'
      },
    balcony:{
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
         default: '1'
      },
    carpet:{
        type: Number,
        required: true,
      },
    age:{
        type: Number,
        required: true,
      },
    total_floor:{
        type: Number,
        required: true,
      },
    room_floor:{
        type: Number,
        required: true,
      },
    loan: {
        type: String,
        enum: ['available', 'not available'],
        required: true,
         default: 'available'
      },
    description:{
        type: String,
        maxlength: 1000,
        required: true, 
      },

      amities: {
        lift: { type: String, enum: ['yes', 'no'], default: 'no' },
        security_guard: { type: String, enum: ['yes', 'no'], default: 'no' },
        play_ground: { type: String, enum: ['yes', 'no'], default: 'no' },
        garden: { type: String, enum: ['yes', 'no'], default: 'no' },
        water_supply: { type: String, enum: ['yes', 'no'], default: 'no' },
        power_backup: { type: String, enum: ['yes', 'no'], default: 'no' },
        fire_security: { type: String, enum: ['yes', 'no'], default: 'no' },
        parking_area: { type: String, enum: ['yes', 'no'], default: 'no' },
        gym: { type: String, enum: ['yes', 'no'], default: 'no' },
        cctv_cameras: { type: String, enum: ['yes', 'no'], default: 'no' },
        shopping_mall: { type: String, enum: ['yes', 'no'], default: 'no' },
        hospital: { type: String, enum: ['yes', 'no'], default: 'no' },
        school: { type: String, enum: ['yes', 'no'], default: 'no' },
        market_area: { type: String, enum: ['yes', 'no'], default: 'no' },
      },
      images:{type:[String]},

      user_id:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
      },

      posted_at: {
        type: Date,
        default: Date.now,
      },

});


PropertySchema.plugin(AutoIncrement,{inc_field:'property_id'});
module.exports=mongoose.model('Property',PropertySchema);

