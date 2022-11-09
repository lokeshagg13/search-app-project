/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/userModel");

require("dotenv").config();

exports.handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(401).json({ message: "Auth failed" });
    }

    const refreshToken = cookies.jwt;

    // Check if email is registered or not
    const user = await userModel.find({ refreshToken: refreshToken });
    if (user.length == 0) {
      return res.status(401).json({ message: "Refresh token is invalid" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || decoded.email !== user[0].email) {
          return res.status(403).json({ message: "Refresh token is invalid" });
        }
        const accessToken = jwt.sign(
          {
            email: decoded.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        res.status(200).json({
          email: decoded.email,
          accessToken,
        });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unknown error occurred: " + error.message });
  }
};
