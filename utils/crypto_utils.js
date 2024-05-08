const bcrypt = require("bcrypt");
require("dotenv").config();
const crypto = require("node:crypto");

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, process.env.PWDSALT);
  return hash;
};

const confirmPassword = async (inputPassword, storedPassword) => {
  const passwordCorrect = await bcrypt.compare(inputPassword, storedPassword);
  return passwordCorrect;
};

const generateApiKey = async (email) => {
  const hashedMail = await bcrypt.hash(email, process.env.PWDSALT);
};

module.exports = {
  hashPassword,
  confirmPassword,
  generateApiKey,
};
