const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const path = require("path"); // Add this line to import the path module

const router = express.Router();

router.get("/:imageName", async (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "../assets", imageName);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(`Error sending file: ${err.message}`);
      res.status(500).send("Internal Server Error");
    }
  });
});

module.exports = router;
