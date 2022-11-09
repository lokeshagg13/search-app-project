const express = require("express");
const verifyJWT = require("../Middleware/verifyJWT");
const logoutController = require("../Controllers/logoutController");

// Router Mounting
const logoutRouter = express.Router();

// Routes for user login
logoutRouter.route("/logout").get(verifyJWT, logoutController.logoutUser);

module.exports = logoutRouter;
