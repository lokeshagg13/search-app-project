/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
const bcrypt = require("bcryptjs");

const catchAsync = require("../Helper/catchAsync");
const { userModel } = require("../Models/userModel");

exports.registerUser = catchAsync(async (req, res, next) => {
  try {
    // Checking if the registration body is correct
    if (
      req.body.name === null ||
      req.body.email === null ||
      req.body.password === null
    ) {
      return res
        .status(400)
        .json({ message: "Invalid request body for user registeration" });
    }

    // Checking if the email has the correct format
    if (
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm.test(
        req.body.email
      ) === false
    ) {
      return res.status(400).json({ message: "Invalid user email" });
    }

    // Check if email is already registered
    const data = await userModel.find({ email: req.body.email });
    if (data.length != 0) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create a new record for user
    await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Return the 200 status success
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unknown error occurred: " + error.message });
  }
});

exports.loginUser = catchAsync(async (req, res, next) => {
  // Checking if the  body is correct
  if (req.body.email === null || req.body.password === null) {
    return res
      .status(400)
      .json({ message: "Invalid request body for user login" });
  }

  // Checking if the email has the correct format
  if (
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm.test(req.body.email) ===
    false
  ) {
    return res.status(400).json({ message: "Invalid user email" });
  }

  // Check if email is registered or not
  const user = await userModel.find({ email: req.body.email });
  if (user.length == 0) {
    return res.status(400).json({ message: "User is not registered" });
  }

  const hashedPassword = bcrypt.hash(req.body.password);
  console.log(hashedPassword)
  const passwordMatch = bcrypt.compare(hashedPassword, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid login credentials" });
  }
  res.status(200).json({
    message: "Log in successful",
  });
});
