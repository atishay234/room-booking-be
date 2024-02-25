// controllers/roomController.js
const Room = require("../models/room");

exports.getAllRooms = async (req, res) => {
  try {
    const currentTime = new Date();
    const rooms = await Room.aggregate([
      {
        $lookup: {
          from: "tags",
          foreignField: "_id",
          localField: "tags",
          as: "tagsData",
        },
      },
    ]);

    const roomsWithAvailability = rooms.map((room) => {
      const nextAvailableSlot = calculateNextAvailableSlot(
        room.sessions,
        currentTime
      );

      return {
        ...room,
        availability: nextAvailableSlot,
      };
    });

    res.status(200).json(roomsWithAvailability);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Helper function to calculate the next available slot
const calculateNextAvailableSlot = (sessions, currentTime) => {
  const sortedSessions = sessions?.sort((a, b) => a.startTime - b.startTime);
  if (sortedSessions) {
    for (const session of sortedSessions) {
      if (session.startTime > currentTime) {
        const timeDifference = session.startTime - currentTime;
        const minutesDifference = Math.ceil(timeDifference / (1000 * 60));

        if (minutesDifference <= 30) {
          return `Available after ${minutesDifference} minutes`;
        } else {
          const tomorrow = new Date(currentTime);
          tomorrow.setDate(currentTime.getDate() + 1);
          return `Available tomorrow at ${formatTime(session.startTime)}`;
        }
      }
    }
  }

  return "Available";
};

// Helper function to format time (assuming startTime is in minutes)
const formatTime = (startTime) => {
  const hours = Math.floor(startTime / 60);
  const mins = startTime % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};
