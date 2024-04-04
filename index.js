const express = require("express");
const mongoose = require("mongoose");
const sessionRoutes = require("./routes/sessions");
const roomRoutes = require("./routes/rooms");
const bookingDetailsRoutes = require("./routes/bookingDetails");
const tagRoutes = require("./routes/tags");
const indexRoute = require("./routes/index");
const imageRoutes = require("./routes/images");
const { authMiddleware } = require("./middleware/authMiddleware");
const cors = require("cors");

const app = express();

mongoose.connect("mongodb://localhost:27017/roomizza", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use(cors());
app.use(express.json());

app.use("/", indexRoute);

app.use("/api/sessions", authMiddleware, sessionRoutes);
app.use("/api/rooms", authMiddleware, roomRoutes);
app.use("/api/booking-details", authMiddleware, bookingDetailsRoutes);
app.use("/api/tags", authMiddleware, tagRoutes);
app.use("/api/images", authMiddleware, imageRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
