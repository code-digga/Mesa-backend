const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const hashPassword = (password) => {
  try {
    var hashSalt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, hashSalt);
    return hash;
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmPassword = async (inputPassword, storedPassword) => {
  try {
    bcrypt.compare(inputPassword, storedPassword, function (err, result) {
      if (err) throw new Error(err.message);
      return result;
    });
  } catch (error) {
    throw Error(error.message);
  }
};

const generateToken = async (email, password) => {
  try {
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    return verifiedToken;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  hashPassword,
  confirmPassword,
  generateToken,
  verifyToken,
};
