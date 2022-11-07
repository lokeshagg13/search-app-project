/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/userModel");

require("dotenv").config();

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Checking if the login body is correct
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Invalid request for user login" });
    }

    // Checking if the email has the correct format
    if (
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm.test(email) === false
    ) {
      return res.status(400).json({ message: "Invalid user email" });
    }

    // Check if email is registered or not
    const user = await userModel.find({ email: email });
    if (user.length == 0) {
      return res.status(401).json({ message: "User is not registered" });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid login credentials" });
    }

    const accessToken = jwt.sign(
      {
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unknown error occurred: " + error.message });
  }
};
