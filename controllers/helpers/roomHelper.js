const createDateObject = (dateString, timeString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const [time, period] = timeString.split(" ");
  let [hour, minute] = time.split(":").map(Number);

  if (hour < 12 && period === "PM") {
    hour += 12;
  } else {
    if (hour === 12 && period === "AM") {
      hour = 0;
    }
  }
  const dateObject = new Date(year, month - 1, day, hour, minute);
  return dateObject;
};

const calculateClosestAvailableSlot = (
  bookings,
  currentTime,
  sessions,
  currentSessionIndex
) => {
  if (
    currentSessionIndex !== -1 &&
    !bookings.find((booking) => {
      return (
        booking.session.equals(sessions[currentSessionIndex]?._id ?? "") &&
        String(new Date(booking.date)) ===
          String(
            new Date(
              `${currentTime.getFullYear()}-${String(
                currentTime.getMonth() + 1
              ).padStart(2, "0")}-${currentTime.getDate()}`
            )
          )
      );
    })
  ) {
    return "Currently Available";
  } else {
    for (
      let i = currentTime.getDate();
      i <=
      new Date(
        currentTime.getFullYear(),
        currentTime.getMonth() + 1,
        0
      ).getDate();
      i++
    ) {
      if (i === currentTime.getDate()) {
        if (
          createDateObject(
            `${currentTime.getFullYear()}-${String(
              currentTime.getMonth() + 1
            ).padStart(2, "0")}-${currentTime.getDate()}`,
            sessions[sessions.length - 1].endTime
          ) < currentTime
        ) {
          continue;
        }
        for (let j = currentSessionIndex + 1; j < sessions.length; j++) {
          const bookingExists = bookings.find(
            (booking) =>
              booking.session.equals(sessions[j]._id) &&
              String(new Date(booking.date)) ===
                String(
                  new Date(
                    `${currentTime.getFullYear()}-${String(
                      currentTime.getMonth() + 1
                    ).padStart(2, "0")}-${i}`
                  )
                )
          );

          if (!bookingExists) {
            const nextAvailableSlotDifference = getDifferenceInMinutes(
              createDateObject(
                `${currentTime.getFullYear()}-${String(
                  currentTime.getMonth() + 1
                ).padStart(2, "0")}-${i}`,
                sessions[j].startTime
              ),
              currentTime
            );
            if (Math.floor(nextAvailableSlotDifference / 60) === 0) {
              return `Available after ${nextAvailableSlotDifference % 60}`;
            } else {
              return `Available after ${Math.floor(
                nextAvailableSlotDifference / 60
              )} hours and ${nextAvailableSlotDifference % 60} minutes`;
            }
          }
        }
      } else {
        for (let j = 0; j < sessions.length; j++) {
          const bookingExists = bookings.find(
            (booking) =>
              booking.session.equals(sessions[j]._id) &&
              String(new Date(booking.date)) ===
                String(
                  new Date(
                    `${currentTime.getFullYear()}-${String(
                      currentTime.getMonth() + 1
                    ).padStart(2, "0")}-${i}`
                  )
                )
          );
          if (!bookingExists) {
            return `Available at ${getFormattedDate(
              getDifferenceInMinutes(
                createDateObject(
                  `${currentTime.getFullYear()}-${String(
                    currentTime.getMonth() + 1
                  ).padStart(2, "0")}-${i}`,
                  sessions[j].startTime
                ),
                currentTime
              )
            )} `;
          }
        }
      }
    }
  }
};

function getFormattedDate(x) {
  let currentDate = new Date();
  let futureDate = new Date(currentDate.getTime() + x * 60000);

  if (
    futureDate.getDate() === currentDate.getDate() + 1 &&
    futureDate.getMonth() === currentDate.getMonth() &&
    futureDate.getFullYear() === currentDate.getFullYear()
  ) {
    return "Tomorrow";
  } else {
    let options = { month: "short" };
    let formattedDate = futureDate.toLocaleDateString("en-US", options);

    let day = futureDate.getDate();
    let suffix =
      day >= 11 && day <= 13
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][
            day % 10
          ];
    formattedDate = day + suffix + " " + formattedDate;

    return formattedDate;
  }
}

function getDifferenceInMinutes(dateObject, currentDate) {
  const timeDifferenceInMilliseconds = currentDate - dateObject;
  const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
  return Math.ceil(Math.abs(timeDifferenceInMinutes));
}

module.exports = { createDateObject, calculateClosestAvailableSlot };
