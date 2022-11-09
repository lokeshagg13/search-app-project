const mongoose = require("mongoose");

// Creating DB Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

userSchema.index({ email: 1 }, { unique: true });

const userModel = mongoose.model("userModel", userSchema, "userCollection");

module.exports = { userModel };
