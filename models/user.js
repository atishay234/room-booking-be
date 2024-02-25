// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Use default MongoDB ObjectId as the userId
});

const User = mongoose.model("User", userSchema);

module.exports = User;
