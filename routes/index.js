// routes/index.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user");

const router = express.Router();

// Route to generate access token on initial page load
router.get("/", async (req, res) => {
  // Check if an anonymous user with a unique userId exists

  // If not, create one

  let user = await User.create({});

  const token = authMiddleware.generateTemporaryToken(user._id);

  // Optionally, you might want to include the token in a cookie or in the response body.
  // For simplicity, this example includes it in the response body.
  res.json({ token, user });
});

module.exports = router;
