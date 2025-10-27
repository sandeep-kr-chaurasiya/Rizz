const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    res.status(500).json({
      message: " internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMessage = "Invalid email or password";
    if (!user) {
      return res.status(403).json({ message: errorMessage });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: errorMessage, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({
      message: " internal Server Error",
      success: false,
      error: err.message,
    });
  }
};
module.exports = {
  signup,
  login,
};
