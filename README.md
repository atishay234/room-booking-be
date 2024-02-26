# Room Booking Application - Backend

This repository contains the backend code for the Room Booking application. The backend provides API endpoints for handling room bookings and managing data in the database.

## Technologies Used

- **Node.js**: The backend is built using Node.js, a JavaScript runtime.
- **Express.js**: A web application framework for Node.js, used for building the backend API.
- **Mongoose**: A MongoDB object modeling library for Node.js, used for interacting with the MongoDB database.
- **Jsonwebtoken**: A library for generating JSON Web Tokens (JWTs) for user authentication.

## Schemas

1. **Room Schema:**
   - `name`: Name of the room (String, required).
   - `capacity`: Seating capacity of the room (Number, required).
   - `tags`: Array of tag IDs associated with the room (Array of ObjectIDs, ref: "Tag").
   - `sessions`: Array of session IDs associated with the room (Array of ObjectIDs, ref: "Session").

2. **Tag Schema:**
   - `name`: Name of the tag (String, required).

3. **Session Schema:**
   - `startTime`: Start time of the session in 12-hour format with AM/PM (String, required).
   - `endTime`: End time of the session in 12-hour format with AM/PM (String, required).

4. **BookingDetails Schema:**
   - `room`: ID of the booked room (ObjectID, ref: "Room", required).
   - `date`: Date of the booking (String, required).
   - `session`: ID of the booked session (ObjectID, ref: "Session", required).
   - `user`: ID of the booking user (ObjectID, ref: "User", required).

## How to Run

```bash
# Clone the repository:
git clone https://github.com/your-username/room-booking.git

# Navigate to the backend directory:
cd room-booking/backend

# Install dependencies:
npm install

# Start the server:
npm start
```


#### Note : Insert sessions in the database using the following format:
  * Start time: "10:00 AM"
  * End time: "7:00 PM"
  * Sessions are in 30-minute intervals.
