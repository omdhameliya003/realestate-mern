
const express=require("express");
const router=express.Router();
const generateUniqueUserId = require("../db/generateUserId");
const User=require("../models/User");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {verifyToken,verifyRoles}=require("../middleware/authmiddleware");
const Property = require("../models/Property");
const Message= require("../models/Messages");
const Saved_Property= require("../models/Saved_Property")
const Comment=require("../models/Comment")
const Requiest= require("../models/Requiest");
const authController = require('../controllers/authController');


router.post("/register",async(req,res)=>{
   const {fname,lname,age,email,mobile,password} = req.body;

   const safeRole='user';

   try {
      const existingUser = await User.findOne({ email: email }).select("-password");
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already exists." });
      }

      const hashpassword= await bcrypt.hash(password,8);
      const userid= await generateUniqueUserId();

      const user= new User({fname,lname,age,email,mobile,password:hashpassword,user_id:userid,role:safeRole});
      await user.save();

      res.status(200).json({ success: true, message: "User registered successfully.",userid });
      
   } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, message: "Server error." });  
   }   
});

router.post("/login",async(req,res)=>{
    const {email, password}= req.body;
    
    try {
      const user= await User.findOne({email});
   
      if(!user){
         return res.status(401).json({success:false,message:"Invalid email."})
      }
      const isMatch=await bcrypt.compare(password,user.password)
      if(!isMatch){
         return res.status(401).json({ success: false, message: "Incorrect password." });
        }

        const payload={_id:user._id,role:user.role};
        const token=jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
        res.json({success:true , message:"Loggin successful",token,user:payload})

    } catch (error) {
      console.error("Login error:", error);
         res.status(500).json({ success: false, message: "Server error." });
    }
   });

   router.get("/me",verifyToken,verifyRoles("user","admin"), async(req,res)=>{

    try {
        const user= await User.findOne({_id:req.user._id}).select("-password");
        if(!user) return res.status(404).json({success:false ,message:"user not found."});
        res.json({success:true , user});
    } catch (error) {
        res.status(500).json({success:false,message:"Server error"});
    }
   });

   router.put("/update-profile/:userid",verifyToken,verifyRoles("user"),async(req,res)=>{

    const {fname,email,mobile,oldpass,newpass,conpass}=req.body;

    try { 
    const user= await User.findOne({_id:req.params.userid});
    if(!user) return res.status(404).json({success:false ,message:"user not found."});

    const isMatch= await bcrypt.compare(oldpass,user.password);

    if(!isMatch){
      return res.status(401).json({ success: false, message: "Incorrect old password." });
     } 
     if(newpass===""){
      return res.status(400).json({ success:false, message: "Passwords not valid to empty." });
     }

     if(newpass!==conpass){
      return res.status(400).json({ success:false, message: "Passwords do not match" });
     }

     const hashpassword= await bcrypt.hash(newpass,8);

     const updateduser= await User.updateOne({_id:req.params.userid},{$set:{fname,email,mobile,password:hashpassword}})

      if(updateduser.modifiedCount===1){
         res.status(200).json({success:true , message:"your profile updated successfully."});
      }
   
      } catch (error) {
         res.status(500).json({success:false, message:"something went wrong."})
      }
   })

   router.get("/alluser",verifyToken,verifyRoles("admin"),async(req,res)=>{
      try {
         const allUser= await User.find().select("-password")
         res.status(200).json({success:true ,allUser }) 
      } catch (error) {
           console.log(error)
           res.status(500).json({success:false , message:"something went wrong, server error"})
      }    
   })

   router.delete("/delete-user/:userid",verifyToken,verifyRoles("admin"),async(req,res)=>{

       try {
         const {userid}= req.params;

         const user= await User.findById(userid)
         if(!user){
            return res.status(404).json({success:false , message:"User not found"})
         }
          const properties= await Property.find({user:userid});
          for(const property of properties){
               await Comment.deleteMany({property_id:property._id})
               await Requiest.deleteMany({property_id:property._id})
               await Saved_Property.deleteMany({property_id:property._id})
          }
          await Property.deleteMany({user:userid });

          await Message.deleteMany({user_id:userid});
          await Saved_Property.deleteMany({user_id:userid});
          await Comment.deleteMany({user_id:userid});
          await Requiest.deleteMany({
            $or:[{user_id:userid},{owner_id:userid}]
          }); 
         
         const deleteduser= await User.findByIdAndDelete({_id:userid})

         if(deleteduser){
            res.status(200).json({success:true , message:"user deleted successfull."})
         }
       } catch (error) {
         console.log(error)
         res.status(500).json({success:false , message:"somthing went wrong, server error"})
       }
   })

   router.put("/changerole/:userid",async(req,res)=>{
          try {
          const {userid}=req.params;
          const {role}=req.body;
          const user= await User.findById({_id:userid})
          if(!user){
            return  res.status(404).json({success:false , message:"User not found"})
          }
          const updateduser= await User.updateOne({_id:userid},{$set:{role:role}});

          if(updateduser.modifiedCount===1){
              return res.status(200).json({success:true , message:`Roll changed ${user.role} to ${role}`});
          }
          } catch (error) {
             console.log(error)
            res.status(500).json({success:false , message:"somthing went wrong, server error"})
          }  
   }) 

router.post('/forgot-password', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/reset-password', authController.resetPassword);

module.exports= router;