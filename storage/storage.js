const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    // Custom folder and filename
    const folder = "CustomFolder"; // Adjust as needed
    const filename = file.originalname;

    // Resize the image
    const transformation = { width: 200, height: 200, crop: "fill" }; // Adjust dimensions as needed

    return {
      folder,
      allowedFormats: ["jpeg", "png", "jpg"],
      public_id: filename,
      transformation,
    };
  },
});
