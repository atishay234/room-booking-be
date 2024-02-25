const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
