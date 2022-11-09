const axios = require("axios");
require("dotenv").config();

exports.getAllImages = async (req, res) => {
  const BASE_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image?max_results=9`;
  const auth = {
    username: process.env.CLOUDINARY_API_KEY,
    password: process.env.CLOUDINARY_API_SECRET,
  };
  try {
    let MAIN_URL = `${BASE_URL}`;
    const { next_cursor } = req.query;
    if (next_cursor) {
      MAIN_URL = `${BASE_URL}&next_cursor=${next_cursor}`;
    }
    const response = await axios.get(MAIN_URL, {
      auth,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error while getting all images" });
  }
};

exports.searchImage = async (req, res) => {
  const BASE_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;
  const auth = {
    username: process.env.CLOUDINARY_API_KEY,
    password: process.env.CLOUDINARY_API_SECRET,
  };
  try {
    const { searchExp } = req.body;
    if (!searchExp) {
      return res
        .status(400)
        .json({ message: "Invalid request for image search" });
    }

    const response = await axios.post(
      BASE_URL,
      JSON.stringify({
        expression: searchExp,
        max_results: 9,
      }),
      {
        auth,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const filteredResources = response.data.resources.filter(
      (item) => item.resource_type == "image"
    );
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
