const express= require("express")
const router= express.Router()
const Requiest= require("../models/Requiest");
const Property = require("../models/Property");
const User = require("../models/User")
const {verifyToken,verifyRoles}=require("../middleware/authmiddleware")


router.post('/requiest',verifyToken,verifyRoles("user"), async(req,res)=>{

    try {
   const {property_id,owner_id,user_id}=req.body;
   const existrequiest=  await Requiest.find({user_id:user_id,property_id:property_id})

   if(user_id=== owner_id){
    return res.status(400).json({success:false , message:"you can not sent enquiery for your owen property"})
   }

   if(existrequiest.length>0){
     return res.status(400).json({success:false, message:"Alredy sent enquiery"})
   }

   const property= await Property.find({_id:property_id});
   if(!property){
    return res.status(404).json({success:false, message:"property not found"});
   }

   const requiest= await Requiest.insertOne({user_id,owner_id,property_id})
   if(requiest){
    return res.status(200).json({success:true , message:"enquiery sent successfull."})
   }
        
    } catch (error) {
        console.log(error);
        res.status(500).json("something went wrong, server error")  
    }
})

router.get('/requiest/sent/:user_id',verifyToken,verifyRoles("user"), async(req,res)=>{
    try {
        const {user_id}= req.params;
        const user= await User.find({_id:user_id});
 
        if(!user){
         res.status(404).json("user not found")
        }

        const requiestdata= await Requiest.find({user_id:user_id}).populate({path:"user_id", select:"fname mobile email"}).populate({path:"property_id" , select:"property_name"});  
        if(requiestdata){
         res.status(200).json({success:true , requiestdata})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("something went wrong, server error") 
    }  
})

router.get('/requiest/received/:Owner_id',verifyToken,verifyRoles("user"), async(req,res)=>{
    try {
        const {Owner_id}= req.params;
        const user= await User.find({_id:Owner_id});
 
        if(!user){
         res.status(404).json("user not found")
        }

        const requiestdata= await Requiest.find({owner_id:Owner_id}).populate({path:"user_id", select:"fname mobile email"}).populate({path:"property_id" , select:"property_name"});  
        if(requiestdata){
         res.status(200).json({success:true , requiestdata})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("something went wrong, server error") 
    }  
})

router.delete('/requiest/:requiest_id',verifyToken,verifyRoles("user"), async(req,res)=>{
    try {
    const {requiest_id}= req.params;

    const exist= await Requiest.findById(requiest_id);

    if(!exist){
        return res.status(404).json({ success: false, message:"Requiest not found."})
    }

    const deleteRequiest= await Requiest.deleteOne({_id:requiest_id})
    if(deleteRequiest){
        return res.status(200).json({success:true, message:"requiest delated successfully."})
    }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false , message:"something went wrong, server error."})
    }
})

module.exports= router;