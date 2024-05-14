const { User } = require("../models/models_associations");
const { generateToken, confirmPassword } = require("../utils/crypto_jwt");
const CustomError = require("../utils/error_class");

const signUp = async (req, res, next) => {
  // making sure no body param is empty
  for (const [key, val] of Object.entries(req.body)) {
    if (!val.trim()) {
      const error = new Error(`${key} value is not valid.`);
      next(error);
      return;
    }
  }
  const { full_name, email, user_password, user_type } = req.body;
  try {
    const newUser = await User.create({
      full_name: full_name,
      email: email,
      password: user_password,
      user_type: user_type,
    });
    const { password, ...others } = newUser.dataValues;

    const userToken = await generateToken(email, user_password);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token: userToken, ...others },
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, user_password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    console.log({ user });

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

    const token = generateToken(email, password);
    const { password, ...others } = user.dataValues;
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token, ...others },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signUp,
  signIn,
};
