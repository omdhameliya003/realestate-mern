const express= require("express")
const router= express.Router()
const Message= require("../models/Messages");
const User = require("../models/User");
const {verifyToken,verifyRoles}=require("../middleware/authmiddleware")

router.post("/message",verifyToken,verifyRoles("user"), async(req,res)=>{
    try {
        const{user_id,user_name,email,message}= req.body;
    const user= await User.findById(user_id)

    if(!user){
       return res.status(404).json({success:false , message:"user not found"})
    }

    if(user.email!== email){
        return res.status(404).json({success:false , message:"Valid only Ragistered Email."})
    }
    if(message==="" || message===undefined){
        return res.status(400).json({success:false , message:"Message require"})
    }
    const messageSave= await Message.insertOne({user_id,user_name,email,message})
    const result= await messageSave.save();

    if(result){
        return res.status(200).json({success:true , message:"Message sent successfull."})
    }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false , message:"Something went wrong,server error"})  
    }
})

router.get("/message",verifyToken,verifyRoles("admin"), async(req,res)=>{
    try {
    
    const messages= await Message.find({}).populate("user_id")
    if(messages){
        res.status(200).json({success:true , messages})
    }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false , message:"Something went wrong, server error"})
    }
})

router.get("/message/:message_id",verifyToken,verifyRoles("admin"),async(req,res)=>{

    try {
        const {message_id}=req.params;
        const message= await Message.find({_id:message_id}).select("-createdAt -updatedAt -user_id")
        res.status(200).json({success:true , message})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false , message:"something went wrong, server error"})
    }

})

router.delete("/message/:message_id",verifyToken,verifyRoles("admin"), async(req,res)=>{
    try {
        const {message_id}= req.params;

    const messages= await Message.findByIdAndDelete({_id:message_id});
    if(messages){
        res.status(200).json({success:true , message:"message deleted successfull."})
    } 
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false , message:"Something went wrong, server error"})
    }
})

module.exports= router;