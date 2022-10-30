const express = require("express");
const userController = require("./Controllers/userController");

// Router Mounting
const router = express.Router();

// Routes for user login and registration
router.route("/login").post(userController.loginUser);
router.route("/register").post(userController.registerUser);

module.exports = router;
