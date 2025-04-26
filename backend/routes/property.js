 const express= require("express")
 const router=express.Router();
 const Property=require("../models/Property")
 const authmiddleware=require("../middleware/authmiddleware")
 const multer=require("multer")
 const path= require("path")
 const User=require("../models/User")

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },

    filename:(req,file,cb)=>{
       cb(null, file.fieldname+"-"+Date.now()+ path.extname(file.originalname))
    }
})

const upload=multer({storage})


router.post("/property",authmiddleware,upload.fields([
    {name:"image_01",maxCount:1},
    {name:"image_02",maxCount:1},
    {name:"image_03",maxCount:1},
    {name:" imagesimage_04",maxCount:1},
    {name:"image_05",maxCount:1},
]), async(req,res)=>{

    try {
        console.log(req.body.userId);
        const user= await User.findById(req.body.userId)
        if (!user) return res.status(404).json({ message: 'User not found' });
        const imagearray=[];

        if(req.files.image_01) imagearray.push(req.files.image_01[0].path);
        if(req.files.image_02) imagearray.push(req.files.image_02[0].path);
        if(req.files.image_03) imagearray.push(req.files.image_03[0].path);
        if(req.files.image_04) imagearray.push(req.files.image_04[0].path);
        if(req.files.image_05) imagearray.push(req.files.image_05[0].path);
        const amities=JSON.parse(req.body.amities);
        
       const newproperty= new Property({...req.body,images:imagearray,amities:amities,user_id:user._id});

      const result=await newproperty.save();
      res.status(200).json({success:true , message:"property posted successful."})
    } catch (error) {
       console.error("postproperty Error:-",error);
       res.status(500).json({success:false,message:"Fail to post property."})
    }
  });


  router.get("/property",authmiddleware,async(req,res)=>{
    try {
        const properties= await Property.find().populate({path:"user_id",select:"-password" })
        res.status(200).json({success:true,properties:properties})
    } catch (error) {
        res.status(500).json("somthing went wrong,server error.") 
    }
  })

  
  router.get("/property/:userid",async (req,res)=>{
    try {
        const properties= await Property.find({user_id:req.params.userid}).select("price property_name address city _id property_id images")
        res.status(200).json({success:true,properties:properties})
    } catch (error) {
        res.status(500).json("somthing went wrong,server error.") 
    }
  })

 


  
  module.exports=router;