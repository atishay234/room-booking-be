const express = require("express");
const bookingDetailsController = require("../controllers/bookingDetailsController");

const router = express.Router();

router.get("/", bookingDetailsController.checkAvailability);
router.post("/book", bookingDetailsController.bookRoom);

module.exports = router;
