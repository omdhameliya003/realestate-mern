const express = require("express")
const router= express.Router()
const Comment= require("../models/Comment")
const Property=require("../models/Property")
const authmiddleware=require("../middleware/authmiddleware")


router.post('/comment',authmiddleware, async(req,res)=>{
    try {  

    const {property_id,user_id,commentMessage}=req.body

    if(commentMessage===""){
        res.status(400).json({success:false, message:"comment message require"})
    }

    const comment= await Comment.insertOne({property_id,user_id,commentMessage})

    if(comment){
        res.status(200).json({success:true, message:"Comment Added."})
       }
    } catch (error) {
        console.log(error)
      res.status(500).json("Something went Wrong,Server error")       
}
})

router.get('/comment/:property_id',authmiddleware, async (req,res)=>{
    
    try {
        const {property_id}=req.params;
    const property= await Property.findById({_id:property_id});

    if(!property){
       return res.status(404).json({success:false , message:"Property not found."})
    }

    const comments= await Comment.find({property_id:property_id}). populate({path:"user_id",select:"fname lname"}).sort({createdAt:-1})
    if(comments){
       return res.status(200).json({success:true, comments})
       }  
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong, Server error")  
    }
  
})

module.exports= router;

