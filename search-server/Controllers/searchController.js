const axios = require("axios");
require("dotenv").config();

// Get all images from cloudinary api
exports.getAllImages = async (req, res) => {
  // Base URL for API to access a location where all images are stored
  const BASE_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`;
  // Username and password from .env file requested for auth at cloudinary API's end
  const auth = {
    username: process.env.CLOUDINARY_API_KEY,
    password: process.env.CLOUDINARY_API_SECRET,
  };
  // In a request, get max results = 9 and if total number > 9, then get a next_cursor in response for
  // getting the next set of 9 images
  const params = new URLSearchParams();
  params.append("max_results", 9);
  try {
    // If the request is with next_cursor, attach that as well in the request URL
    const { nextCursor } = req.query;
    if (nextCursor) {
      params.append("next_cursor", nextCursor);
    }
    // Send request to cloudinary images api
    const response = await axios.get(`${BASE_URL}?${params}`, {
      auth,
    });

    // Send back its response to frontend
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error while getting all images" });
  }
};

// Search for images in cloudinary api
exports.searchImage = async (req, res) => {
  // Base URL for API to access a location where searched images are stored
  const BASE_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;
  // Username and password from .env file requested for auth at cloudinary API's end
  const auth = {
    username: process.env.CLOUDINARY_API_KEY,
    password: process.env.CLOUDINARY_API_SECRET,
  };
  try {
    // Get search expression and next cursor from request body (since its a post request)
    const { searchExp, nextCursor } = req.body;
    if (!searchExp) {
      return res
        .status(400)
        .json({ message: "Invalid request for image search" });
    }

    // In a request, get max results = 9 and if total number > 9, then get a next_cursor in response for
    // getting the next set of 9 images
    const requestBody = { expression: searchExp, max_results: 9 };
    if (nextCursor) {
      requestBody["next_cursor"] = nextCursor;
    }

    // Send request to cloudinary API
    const response = await axios.post(BASE_URL, JSON.stringify(requestBody), {
      auth,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Filter out only resources that are image type
    const filteredResources = response.data.resources.filter(
      (item) => item.resource_type == "image"
    );
    // Send back the response
    return res.status(200).json({
      total_count: filteredResources.length,
      resources: [...filteredResources],
      next_cursor: response.data.next_cursor,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while searching for images" });
  }
};
