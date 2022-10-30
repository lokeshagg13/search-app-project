/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/userModel");

require("dotenv").config();

exports.logoutUser = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(401).json({ message: "Authorization failed" });
    }

    const refreshToken = cookies.jwt;

    // Check if email is registered or not
    const user = await userModel.find({ refreshToken: refreshToken });
    if (user.length == 0) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(204).json({ message: "Logout successful" });
    }

    await userModel.updateOne(
      {
        email: user[0].email,
      },
      {
        $set: { refreshToken: "" },
      }
    );
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(204).json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unknown error occurred: " + error.message });
  }
};
