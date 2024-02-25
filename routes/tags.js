const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

// Route: GET all tags
router.get("/", tagController.getAllTags);

module.exports = router;
