const startTime = new Date();
startTime.setHours(10, 0, 0, 0); // Set start time to 10:00 AM

const endTime = new Date();
endTime.setHours(19, 0, 0, 0); // Set end time to 7:00 PM

const sessionArray = [];

while (startTime < endTime) {
  const sessionEndTime = new Date(startTime);
  sessionEndTime.setMinutes(sessionEndTime.getMinutes() + 30);

  sessionArray.push({
    startTime: startTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    endTime: sessionEndTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  startTime.setMinutes(startTime.getMinutes() + 30);
}

db.sessions.insertMany(sessionArray);
