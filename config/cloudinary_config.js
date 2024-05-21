const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  api_key: process.env.CLOUDINARY_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
});
const uploadFile = (courseCode, lessonFile) => {
  try {
    const resp = cloudinary.uploader.upload(lessonFile, {
      folder: `/lessons/${courseCode}`,
      resource_type: "video",
    });

    return resp.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = uploadFile;
