 const express=require("express")
 const router=express.Router()
const {verifyToken,verifyRoles}=require("../middleware/authmiddleware")
 const Saved_Property= require("../models/Saved_Property")
 const Property=require("../models/Property")
 const User = require("../models/User")



 router.post('/saveProperty',verifyToken,verifyRoles("user"),async(req,res)=>{
    try {
    const { property_id,user_id } =req.body;
    console.log(user_id)
    const property= await Property.findById(property_id);
    const user= await User.findById({_id:user_id})
      if(!property){
        return res.status(404).json(" This propurty not found.")
       }
    if(!user){
          res.status(404).json("user not found.")
      }
    //   const exist= await Saved_Property.find({property_id:property_id,user_id:user_id});
    //   if(exist){
    //     res.status(400).json({success:true , message:"Alredy saved."})
    //   }

      const SavedProperty= await Saved_Property.insertOne({property_id:property_id,user_id:user_id});
      if(SavedProperty){
       return  res.status(200).json({success:true,message:"property saved successfully."})
      }  
    } catch (error) {
        console.log(error);
       return res.status(500).json('something went wront, server error.') 
    }
});

router.post('/unsaveProperty',verifyToken,verifyRoles("user"), async(req,res)=>{
  try {
    const { property_id,user_id } =req.body;
    const removeProperty= await Saved_Property.deleteOne({property_id:property_id,user_id:user_id});

    if(removeProperty){
        return  res.status(200).json({success:true,message:"property removed successfully."})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json('something went wront, server error.') 
  }
})


router.get('/saveProperty/user/:user_id',verifyToken,verifyRoles("user"),async(req,res)=>{

    try {
        const {user_id} = req.params;
        const userSavedProperties= await Saved_Property.find({user_id})
         const propertyIds= userSavedProperties.map(item => item.property_id)
         const properties= await Property.find({_id:{$in:propertyIds}}).populate({path:"user",select:"-password -age -email -createdAt -updatedAt" });  
        res.status(200).json({success:true ,properties , propertyIds});
    } catch (error) {
        console.log(error)
        res.status(500).json("something went wrong, server error.")
    }

})

    module.exports= router;
