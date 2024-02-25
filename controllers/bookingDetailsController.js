const BookingDetails = require("../models/bookingDetails");
const Room = require("../models/room");
const Session = require("../models/session");
const authMiddleware = require("../middleware/authMiddleware");

// Example: Book a room for a specific date and session
exports.bookRoom = async (req, res) => {
  try {
    const { roomId, date, session } = req.body;
    const userId = req.userId; // Extract userId from authenticated user

    // Check if the room is available for the specified date and session
    const isAvailable = await checkRoomAvailability(roomId, date, session);

    if (!isAvailable) {
      return res.status(400).json({
        message: "Room is not available for the selected date and session",
      });
    }

    // Create a booking
    const booking = new BookingDetails({
      room: roomId,
      session,
      user: userId,
      date: new Date(date),
    });

    // Save the booking details
    await booking.save();

    res.status(201).json({ message: "Room booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to check room availability
const checkRoomAvailability = async (roomId, date, session) => {
  const existingBooking = await BookingDetails.findOne({
    room: roomId,
    date,
    session,
    isAvailable: true,
  });

  return !existingBooking;
};

exports.checkAvailability = async (req, res) => {
  try {
    const { roomId, date } = req.query;

    // Find all booking details for the specified room and date
    const bookingDetails = await BookingDetails.find({ room: roomId, date });

    res.json(bookingDetails);
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
