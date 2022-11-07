const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json("Auth failed");
  }
  try {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) res.status(403).json("Invalid token");
      req.email = decoded.email;
      next();
    });
  } catch (error) {
    return res.status(401).json("Auth failed");
  }
};

module.exports = verifyJWT;
