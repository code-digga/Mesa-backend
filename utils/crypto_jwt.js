const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  console.log("======================> recieved password: " + password);
  console.log("======================> recieved salt: " + process.env.PWDSALT);
  try {
    const hash = await bcrypt.hash(password, process.env.PWDSALT);
    return hash;
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmPassword = async (inputPassword, storedPassword) => {
  try {
    const passwordCorrect = await bcrypt.compare(inputPassword, storedPassword);
    return passwordCorrect;
  } catch (error) {
    throw new Error(error.message);
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
