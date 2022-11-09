const express = require("express");
const verifyJWT = require("../Middleware/verifyJWT");
const refreshTokenController = require("../Controllers/refreshTokenController");

// Router Mounting
const refreshRouter = express.Router();

// Routes for user login
refreshRouter
  .route("/refreshSession")
  .get(refreshTokenController.handleRefreshToken);

module.exports = refreshRouter;
