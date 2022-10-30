const express = require("express");
const refreshTokenController = require("../Controllers/refreshTokenController");

// Router Mounting
const refreshRouter = express.Router();

// Routes for user login
refreshRouter
  .route("/refreshToken")
  .get(refreshTokenController.handleRefreshToken);

module.exports = refreshRouter;
