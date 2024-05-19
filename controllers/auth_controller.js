const { User } = require("../models/models_associations");
const { generateToken, confirmPassword } = require("../utils/crypto_jwt");
const CustomError = require("../utils/error_class");

const signUp = async (req, res, next) => {
  const { full_name, email, user_password, user_type } = req.body;
  try {
    const newUser = await User.create({
      full_name: full_name,
      email: email,
      password: user_password,
      user_type: user_type,
    });
    const { password, ...others } = newUser.dataValues;

    const token = await generateToken(email, user_type);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user_token: token, ...others },
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

const signIn = async (req, res, next) => {
  const { email, user_password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new CustomError(404, "Account not found");
    }

    const passwordConfirmed = await confirmPassword(
      user_password,
      user.dataValues.password
    );

    if (!passwordConfirmed) {
      throw new CustomError(401, "Password is incorrect");
    }

    const token = await generateToken(email, user.dataValues.user_type);
    const { password, ...others } = user.dataValues;
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user_token: token, ...others },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signUp,
  signIn,
};
