// routes/bookingDetails.js
const express = require("express");
const bookingDetailsController = require("../controllers/bookingDetailsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route: Book a room
router.get("/", bookingDetailsController.checkAvailability);
router.post("/book", bookingDetailsController.bookRoom);

module.exports = router;
