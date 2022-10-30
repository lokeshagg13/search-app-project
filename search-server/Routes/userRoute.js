const express = require("express");
const userController = require("../Controllers/userController");

// Router Mounting
const userRouter = express.Router();

// Routes for user registration
userRouter.route("/register").post(userController.registerUser);

module.exports = userRouter;
