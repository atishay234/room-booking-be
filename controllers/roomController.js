const BookingDetails = require("../models/bookingDetails");
const Room = require("../models/room");
const Session = require("../models/session");
const {
  createDateObject,
  calculateClosestAvailableSlot,
} = require("./helpers/roomHelper.js");

exports.getAllRooms = async (req, res) => {
  try {
    const { query } = req.query;

    const regex = new RegExp(query, "i");
    const queryWords = query.split(/\s+/);

    const queryConditions = queryWords.map((word) => ({
      $or: [
        { name: { $regex: new RegExp(word, "i") } },
        { capacity: { $gte: parseInt(word) - 20, $lte: parseInt(word) + 20 } },
        { "tagsData.name": { $regex: new RegExp(word, "i") } },
      ],
    }));

    const filter = { $and: queryConditions };

    const rooms = await Room.aggregate([
      {
        $lookup: {
          from: "tags",
          foreignField: "_id",
          localField: "tags",
          as: "tagsData",
        },
      },
      { $match: filter },
    ]);

    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
exports.getClosestAvailableSlots = async (req, res) => {
  try {
    const currentTime = new Date();
    const rooms = await Room.find();
    const sessions = await Session.find();

    const currentSessionIndex = sessions.findIndex((session) => {
      return (
        createDateObject(
          `${currentTime.getFullYear()}-${String(
            currentTime.getMonth() + 1
          ).padStart(2, "0")}-${currentTime.getUTCDate()}`,
          session.startTime
        ) < currentTime &&
        createDateObject(
          `${currentTime.getFullYear()}-${String(
            currentTime.getMonth() + 1
          ).padStart(2, "0")}-${currentTime.getUTCDate()}`,
          session.endTime
        ) > currentTime
      );
    });

    const roomsWithClosestSlots = await Promise.all(
      rooms.map(async (room) => {
        const bookingDetails = await BookingDetails.find({ room: room._id });
        const closestSlot = calculateClosestAvailableSlot(
          bookingDetails,
          currentTime,
          sessions,
          currentSessionIndex
        );

        return {
          [room._id]: closestSlot,
        };
      })
    );

    const response = roomsWithClosestSlots.reduce((acc, room) => {
      return { ...acc, ...room };
    }, {});

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
