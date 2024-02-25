const mongoose = require("mongoose");

const bookingDetailsSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  isAvailable: { type: Boolean, default: true },
  nextAvailableTime: { type: Date },
});

const BookingDetails = mongoose.model("BookingDetails", bookingDetailsSchema);

module.exports = BookingDetails;
