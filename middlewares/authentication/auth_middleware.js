const { verifyToken } = require("../../utils/crypto_jwt");
const CustomError = require("../../utils/error_class");

const checkToken = async (req, res, next) => {
  const headerValue = req.header("Authorization");
  if (!headerValue) {
    const err = new CustomError(
      403,
      "Pass a token in the authorization header"
    );
    next(err);
  }
  const token = headerValue.split(" ")[1];
  try {
    const isValid = verifyToken(token);
    if (isValid) {
      next();
    }
  } catch (error) {
    const err = new CustomError(403, error.message);
    next(err);
  }
};

module.exports = checkToken;
