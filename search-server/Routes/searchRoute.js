const express = require("express");
const verifyJWT = require("../Middleware/verifyJWT");
const searchController = require("../Controllers/searchController");

// Router Mounting
const searchRouter = express.Router();

// Route for getting all images
searchRouter
  .route("/images/all")
  .get(verifyJWT, searchController.getAllImages);

// Routes for image search
searchRouter
  .route("/images/search")
  .post(verifyJWT, searchController.searchImage);

module.exports = searchRouter;
