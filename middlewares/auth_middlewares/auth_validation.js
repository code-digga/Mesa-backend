const Joi = require("joi");
const CustomError = require("../../utils/error_class");

const RegisterSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  user_password: Joi.string().required(),
  user_type: Joi.string().required(),
});

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  user_password: Joi.string().required(),
});

const validateLogin = async (req, res, next) => {
  try {
    const isValid = await LoginSchema.validateAsync(req.body);
    if (isValid) {
      next();
    } else {
      throw new Error("Bad request: incorrect parameters");
    }
  } catch (error) {
    const err = new CustomError(400, error.message);
    next(err);
  }
};

const validateRegister = async (req, res, next) => {
  try {
    const isValid = await RegisterSchema.validateAsync(req.body);
    if (isValid) {
      next();
    } else {
      throw new Error("Bad request: incorrect parameters");
    }
  } catch (error) {
    const err = new CustomError(400, error.message);
    next(err);
  }
};

module.exports = {
  validateLogin,
  validateRegister,
};
