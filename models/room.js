const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
