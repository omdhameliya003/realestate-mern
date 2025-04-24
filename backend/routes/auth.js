
const express=require("express");
const router=express.Router();
const generateUniqueUserId = require("../db/generateUserId");
const User=require("../models/User");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const authmiddleware=require("../middleware/authmiddleware")


router.post("/register",async(req,res)=>{
   const {fname,lname,age,email,mobile,password} = req.body;

   try {
      const existingUser = await User.findOne({ email: email }).select("-password");
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already exists." });
      }

      const hashpassword= await bcrypt.hash(password,8);
      const userid= await generateUniqueUserId();

      const user= new User({fname,lname,age,email,mobile,password:hashpassword,user_id:userid});
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

        const payload={user_id:user.user_id,email:email};
        const token=jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"10d"})
        res.json({success:true , message:"Loggin successfully",token})

    } catch (error) {
      console.error("Login error:", error);
         res.status(500).json({ success: false, message: "Server error." });
    }
   });

   router.get("/me",authmiddleware, async(req,res)=>{

    try {
        const user= await User.findOne({user_id:req.user.user_id}).select("-password");
        if(!user) return res.status(404).json({success:false ,message:"user not found."});
        res.json({success:true , user});
    } catch (error) {
        res.status(500).json({success:false,message:"Server error"});
    }
   });


module.exports= router;