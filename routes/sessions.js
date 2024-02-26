const express = require("express");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.get("/", sessionController.getAllSessions);

module.exports = router;
