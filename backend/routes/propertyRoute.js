const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const {verifyToken,verifyRoles}=require("../middleware/authmiddleware")
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const countweekmiddleware= require("../middleware/countweekmiddleware")
const Saved_Property= require("../models/Saved_Property")
const Comment=require("../models/Comment")
const Requiest= require("../models/Requiest");
const {uploadmultiple,deleteCloudinaryImage} = require("../middleware/fileuploads")
const cloudinary= require("cloudinary").v2;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");  
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });


router.post(
  "/property",
  verifyToken,verifyRoles("user"),uploadmultiple, async (req, res) => {
    try {
      const user = await User.findById(req.body.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      const imagearray = [];

      if (req.files.image_01) imagearray.push(req.files.image_01[0].path);
      if (req.files.image_02) imagearray.push(req.files.image_02[0].path);
      if (req.files.image_03) imagearray.push(req.files.image_03[0].path);
      if (req.files.image_04) imagearray.push(req.files.image_04[0].path);
      if (req.files.image_05) imagearray.push(req.files.image_05[0].path);
      const amities = JSON.parse(req.body.amities);

      const newproperty = new Property({
        ...req.body,
        images: imagearray,
        amities: amities,
        user: user._id,
      });

      const result = await newproperty.save();
      res
        .status(200)
        .json({ success: true, message: "property posted successful." });
    } catch (error) {
      console.error("postproperty Error:-", error);
      res
        .status(500)
        .json({ success: false, message: "Fail to post property." });
    }
  }
);

router.get("/property", verifyToken,verifyRoles("user","admin"), async (req, res) => {
  try {
    const properties = await Property.find()
      .populate({
        path: "user",
        select: "-password -age -email -createdAt -updatedAt",
      })
      .sort({ posted_at: -1 });
    res.status(200).json({ success: true, properties: properties });
  } catch (error) {
    res.status(500).json("somthing went wrong,server error.");
  }
});

router.get("/property/user/:userid",verifyToken,verifyRoles("user"), async (req, res) => {
  try {
    const properties = await Property.find({ user: req.params.userid }).select(
      "price property_name address city _id property_id images"
    );
    res.status(200).json({ success: true, properties: properties });
  } catch (error) {
    res.status(500).json("somthing went wrong,server error.");
  }
});

router.post("/property/filter", verifyToken,verifyRoles("user"),async (req, res) => {
  const {
    state,
    city,
    offer,
    type,
    min_badget,
    max_badget,
    status,
    furnished,
  } = req.body;

  if (
    !state ||
    !city ||
    !offer ||
    !type ||
    !min_badget ||
    !max_badget ||
    !status ||
    !furnished
  ) {
    res
      .status(400)
      .json({ success: false, message: "All filter fields are require." });
  }
  const filter = {
    state,
    city,
    offer,
    type,
    price: { $gte: Number(min_badget), $lte: Number(max_badget) },
    status,
    furnished,
  };
  const filterproperties = await Property.find(filter).populate({
    path: "user",
    select: "-password -age -email -createdAt -updatedAt",
  });

  if (filterproperties) {
    res.status(200).json({ success: true, filterproperties: filterproperties });
  }
});

router.delete("/property/:property_id", verifyToken,verifyRoles("user","admin"), async (req, res) => {
  try {
    const {property_id}= req.params;

        await Comment.deleteMany({property_id:property_id})
        await Requiest.deleteMany({property_id:property_id})
        await Saved_Property.deleteMany({property_id:property_id})

    const deletedProperty = await Property.findByIdAndDelete({_id:property_id});
    if (deletedProperty) {
      res.status(200).json({ success: true, message: "Properety delated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Properety not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("somthing went wrong,server error.");
  }
});

router.get("/property/:property_id",verifyToken,verifyRoles("user","admin"), async (req, res) => {
  try {
    const property = await Property.findById(req.params.property_id).populate({
      path: "user",
      select: "-password -age -email -createdAt -updatedAt",
    });
    if (property) {
      res.status(200).json({ success: true, property });
    } else {
      res.status(404).json("this property not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong, server error");
  }
});

router.put("/property/:propertyId",uploadmultiple, async (req, res) => {
  
  try {
    const {propertyId} = req.params;
    const existingProperty = await Property.findById(propertyId);

    if (!existingProperty) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    const updatedData = { ...req.body };
    
   if (typeof updatedData.user === 'string') {
  try {
    const parsedUser = JSON.parse(updatedData.user);
    updatedData.user = parsedUser._id; // extract only ObjectId
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid user format" });
  }
} else if (typeof updatedData.user === 'object' && updatedData.user._id) {
  updatedData.user = updatedData.user._id;
} 

     if (updatedData.amities && typeof updatedData.amities === "string") {
      updatedData.amities = JSON.parse(updatedData.amities);
    }

    const imageFields = [
      "image_01",
      "image_02",
      "image_03",
      "image_04",
      "image_05",
    ];

const newImages = [];
const deletePromises = [];

for (const field of imageFields) {
  if (req.files && req.files[field] && req.files[field][0]) {
    const file = req.files[field][0];
    const newImageUrl = file.path || file.secure_url || file.url;

    const index = imageFields.indexOf(field);
    const oldImageUrl = existingProperty.images?.[index];

    if (oldImageUrl && oldImageUrl !== newImageUrl) {
      deletePromises.push(deleteCloudinaryImage(oldImageUrl));
    }
    newImages[index] = newImageUrl;
  } else {
    const index = imageFields.indexOf(field);
    newImages[index] = existingProperty.images?.[index];
  }
}

await Promise.all(deletePromises);

updatedData.images = newImages;

imageFields.forEach((field) => delete updatedData[field]);

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, updatedData, {
      new: true,
    });

     if (!updatedProperty) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    
    res.status(200).json({ success: true, message: "Property updated", property: updatedProperty });

  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/totalPropertyCount",verifyToken,verifyRoles("admin"), async (req, res) => {
  try {
    const counts = await Property.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: 1 },
        },
      },
    ]);

    const summary = {
      house: 0,
      flat: 0,
      shop: 0,
      office: 0,
    };
    counts.forEach(({ _id, total }) => {
      summary[_id] = total;
    });

    res.status(200).json({ success: true, summary });
  } catch (error) {
    console.error("Error getting property summary:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/offer-summary", verifyToken,verifyRoles("admin"),async (req, res) => {
  try {
    const results= await Property.aggregate([
        {
            $group:{
                _id:{type:'$type',offer:'$offer'},
                count:{$sum:1},
            },
        },
    ])

     const typeOrder = ['house', 'flat', 'shop', 'office'];
    const saleMap = { house: 0, flat: 0, shop: 0, office: 0 };
    const rentMap = { house: 0, flat: 0, shop: 0, office: 0 };

 results.forEach(({ _id, count }) => {
      const { type, offer } = _id;
      if (offer === 'sell') {
        saleMap[type] = count;
      } else if (offer === 'rent') {
        rentMap[type] = count;
      }
    });
    const forSale = typeOrder.map((type) => saleMap[type]);
    const forRent = typeOrder.map((type) => rentMap[type]);

    res.status(200).json({success:true , forSale , forRent})

  } catch (error) {
      console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/weeklyListing-summary',verifyToken,verifyRoles("admin"), async (req, res) => {
  try {
   const { startOfWeek, endOfWeek } = countweekmiddleware();
     const timezone = "Asia/Kolkata";
    const listings = await Property.aggregate([
      {
        $match: {
          posted_at: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $addFields: {
          dayOfWeek: {
            $dayOfWeek: {
              date: "$posted_at",
              timezone: timezone,
            },
          },
        },
      },
      {
        $group: {
          _id: "$dayOfWeek",
          total: { $sum: 1 },
        },
      },
    ]);

    const dayMap = {
      1: 'Sunday',
      2: 'Monday',
      3: 'Tuesday',
      4: 'Wednesday',
      5: 'Thursday',
      6: 'Friday',
      7: 'Saturday'
    };

    const weeklyData = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0
    };

    listings.forEach(({ _id, total }) => {
      weeklyData[dayMap[_id]] = total;
    });
    res.status(200).json({success:true , weeklyData});
  } catch (error) {
    console.error('Error fetching weekly listings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
