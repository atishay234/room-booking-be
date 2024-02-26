const express = require("express");
const roomController = require("../controllers/roomController");

const router = express.Router();

router.get("/", roomController.getAllRooms);
router.get("/closest-available-slot", roomController.getClosestAvailableSlots);

module.exports = router;
