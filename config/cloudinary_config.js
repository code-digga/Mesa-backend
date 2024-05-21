const cloudinary = require("cloudinary").v2;

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
