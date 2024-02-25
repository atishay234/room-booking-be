const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

// Route: GET all sessions
router.get("/", sessionController.getAllSessions);

module.exports = router;
