const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  let user = await User.create({});

  const token = authMiddleware.generateTemporaryToken(user._id);

  res.json({ token, user });
});

module.exports = router;
