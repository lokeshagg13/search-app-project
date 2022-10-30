const express = require("express");
const authController = require("../Controllers/authController");

// Router Mounting
const authRouter = express.Router();

// Routes for user login
authRouter.route("/login").post(authController.loginUser);

module.exports = authRouter;
