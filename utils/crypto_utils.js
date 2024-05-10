const bcrypt = require("bcrypt");
require("dotenv").config();
const { subtle } = require("node:crypto").webcrypto;

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, process.env.PWDSALT);
  return hash;
};

const confirmPassword = async (inputPassword, storedPassword) => {
  const passwordCorrect = await bcrypt.compare(inputPassword, storedPassword);
  return passwordCorrect;
};

const generateApiKey = async (email, password) => {
  const hashedMail = await bcrypt.hash(email + password, process.env.PWDSALT);
};

module.exports = {
  hashPassword,
  confirmPassword,
  generateApiKey,
};
