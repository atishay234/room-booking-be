const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// Route: GET all rooms
router.get("/", roomController.getAllRooms);

module.exports = router;
