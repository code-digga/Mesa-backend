const { User } = require("../models/models_associations");
const { generateToken, confirmPassword } = require("../utils/crypto_jwt");

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

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    console.log({ user });

    if (!user) {
      throw new Error("Account not found");
    }

    const passwordConfirmed = await confirmPassword(password, user.password);

    if (!passwordConfirmed) {
      throw new Error("Password is incorrect");
    }

    const token = generateToken(email, password);
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = {
  signUp,
  signIn,
};
