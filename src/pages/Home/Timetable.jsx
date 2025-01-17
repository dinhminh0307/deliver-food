import React from "react";

const Timetable = () => {
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "auto",
      padding: "20px",
      backgroundColor: "#333",
      borderRadius: "8px",
      color: "#fff",
    },
    timetable: {
      display: "grid",
      gridTemplateColumns: "100px repeat(7, 1fr)", // One column for time slots and seven for days
      gridAutoRows: "40px", // Each row represents a 30-minute interval
      gap: "2px",
    },
    dayHeader: {
      backgroundColor: "#444",
      color: "#fff",
      fontSize: "16px",
      textAlign: "center",
      padding: "10px 0",
      borderBottom: "1px solid #555",
    },
    timeLabel: {
      backgroundColor: "#222",
      color: "#aaa",
      fontSize: "12px",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    timeSlot: {
      backgroundColor: "#222",
      border: "1px solid #444",
      color: "#aaa",
      fontSize: "12px",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    event: {
      backgroundColor: "#4CAF50",
      color: "#fff",
      padding: "10px",
      borderRadius: "4px",
      fontSize: "14px",
      textAlign: "center",
    },
    eventLong: {
      backgroundColor: "#FF9800",
      color: "#fff",
      padding: "10px",
      borderRadius: "4px",
      fontSize: "14px",
      textAlign: "center",
    },
  };

  // Generate time slots from 1:00 AM to 12:00 AM
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 1;
    let period = "AM";
    for (let i = 0; i < 48; i++) {
      const time = `${hour}:${i % 2 === 0 ? "00" : "30"} ${period}`;
      slots.push(time);
      if (i % 2 !== 0) {
        hour++;
        if (hour === 12 && period === "AM") period = "PM";
        else if (hour === 13) hour = 1;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div style={styles.container}>
      <h2>Weekly Timetable</h2>
      <div style={styles.timetable}>
        {/* Day Headers */}
        <div style={styles.timeLabel}></div> {/* Empty cell for time column header */}
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
          <div key={day} style={styles.dayHeader}>
            {day}
          </div>
        ))}

        {/* Time Labels */}
        {timeSlots.map((time, index) => (
          <div key={index} style={styles.timeLabel}>
            {time}
          </div>
        ))}

        {/* Time Slots for Days */}
        {Array.from({ length: 7 }).map((_, dayIndex) => (
          timeSlots.map((_, slotIndex) => (
            <div
              key={`${dayIndex}-${slotIndex}`}
              style={{
                ...styles.timeSlot,
                gridColumn: dayIndex + 2, // Days start at the second column
                gridRow: slotIndex + 2,  // Time slots start below the headers
              }}
            ></div>
          ))
        ))}

        {/* Example Events */}
        <div style={{ ...styles.event, gridColumn: "2", gridRow: "3 / span 4" }}>
          Morning Meeting
        </div>
        <div style={{ ...styles.event, gridColumn: "4", gridRow: "10 / span 3" }}>
          Gardening
        </div>
        <div style={{ ...styles.eventLong, gridColumn: "7", gridRow: "15 / span 8" }}>
          Soccer Match
        </div>
      </div>
    </div>
  );
};

export default Timetable;
