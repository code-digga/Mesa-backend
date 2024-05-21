const multer = require("multer");
const CustomError = require("../utils/error_class");

const uploader = multer({ dest: "uploads/" });

const uploadFile = (req, res, next) => {
  try {
    uploader.single("lesson_file");
    next();
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

module.exports = uploadFile;
