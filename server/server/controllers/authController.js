const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    // ho gaya?

    const user = new User({ username, email, password, role: "admin" });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Authenticate user and get token
// controllers/authController.js
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Error: Invalid email or password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Error: Invalid email or password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.jwtSecret,
      {
        expiresIn: "7h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Server error", error });
  }
};

const utheProfile = async (req, res) => {
  try {
    console.log(req.user);
    res.status(200).json({ user: res.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  registerUser,
  authUser,
  utheProfile,
};
