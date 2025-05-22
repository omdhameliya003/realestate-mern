const nodemailer= require("nodemailer")
const express= require("express")
const router= express.Router()
const generatereplyEmailFormat= require(".././utils/generatereplyEmailFormat")
const {verifyToken,verifyRoles}=require("../middleware/authmiddleware")


router.post("/send-message-reply-mail",verifyToken,verifyRoles("admin"),async(req,res)=>{

    const {user_email, message, replymessage}= req.body;
    if(user_email==="" && message==="" && replymessage===""){
        res.status(400).json({success:false , message:"All fields are require"})
    }

    const transpoter= nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.EMAIL_ID,
            pass:process.env.APP_PASSWORD,
        }
    });

    const htmlEmailFormat=generatereplyEmailFormat(message,replymessage)

    try {
         await transpoter.sendMail({
            from:`"Admin Team" ${process.env.EMAIL_ID}`,
            to:user_email,
            subject:"Reply to Your Message - Admin Response from Wonder Property",
            html:htmlEmailFormat,
         });
         res.status(200).json({success:true , message:"Mail Sent Successful."})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false , message:"something went wong, try angain later" , err:err.message})
    }

})  

module.exports= router;
