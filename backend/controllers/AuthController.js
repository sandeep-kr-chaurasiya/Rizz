const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const userModel = new UserModel({ username, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (err) {
    res
      .status(500)
      .json({
        message: " internal Server Error",
        success: false,
        error: err.message,
      });
  }
};

module.exports = {
  signup,
};
