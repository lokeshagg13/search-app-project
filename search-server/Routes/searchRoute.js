const express = require("express");
const verifyJWT = require("../Middleware/verifyJWT");
const searchController = require("../Controllers/searchController");

// Router Mounting
const searchRouter = express.Router();

// Routes for image search
searchRouter
  .route("/images/search")
  .post(verifyJWT, searchController.searchImage);

module.exports = searchRouter;
