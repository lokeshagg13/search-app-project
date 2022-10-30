const express = require("express");
const logoutController = require("../Controllers/logoutController");

// Router Mounting
const logoutRouter = express.Router();

// Routes for user login
logoutRouter.route("/logout").get(logoutController.logoutUser);

module.exports = logoutRouter;
