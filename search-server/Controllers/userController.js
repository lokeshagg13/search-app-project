/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
const bcrypt = require("bcryptjs");
const { userModel } = require("../Models/userModel");

// For registration of user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Checking if the registration body is correct
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Invalid request for user registeration" });
    }

    // Checking if the email has the correct format
    if (
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm.test(email) === false
    ) {
      return res.status(400).json({ message: "Invalid user email" });
    }

    // Check if email is already registered
    const user = await userModel.find({ email: email });
    if (user.length !== 0) {
      return res.status(409).json({ message: "User already registered" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new record for user
    await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Return the 201 status success
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unknown error occurred: " + error.message });
  }
};
