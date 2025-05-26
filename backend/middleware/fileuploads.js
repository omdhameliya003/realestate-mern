const dotenv=require("dotenv");
const multer = require("multer")
const {CloudinaryStorage}= require("multer-storage-cloudinary")
const cloudinary= require("cloudinary").v2;

dotenv.config();
cloudinary.config({
    cloud_name:process.env.CLOUDNARY_NAME,
    api_key:process.env.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_SECRET_KEY,
})

const storage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'propertyImage'
    }
})

const cloudinaryFileUpload= multer({storage})
const uploadmultiple= cloudinaryFileUpload.fields([
    { name: "image_01", maxCount: 1 },
    { name: "image_02", maxCount: 1 },
    { name: "image_03", maxCount: 1 },
    { name: "image_04", maxCount: 1 },
    { name: "image_05", maxCount: 1 },
  ]);


  
const deleteCloudinaryImage = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    const urlParts = imageUrl.split('/');

    const uploadIndex = urlParts.findIndex((part) => part === 'upload');

    const afterUpload = urlParts.slice(uploadIndex + 1).join('/');

    const publicIdWithExtension = afterUpload.replace(/^v\d+\//, '');

    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '');

    const result = await cloudinary.uploader.destroy(publicId);

    console.log("Cloudinary deletion result:", result);
  } catch (err) {
    console.error("Cloudinary deletion error:", err.message);
  }
};

  module.exports={uploadmultiple, deleteCloudinaryImage};
