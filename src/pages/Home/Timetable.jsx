import React, { useState, useEffect } from "react";

const Timetable = () => {
  const [scheduleDatas, setScheduleData] = useState([]);
  const [alert, setAlert] = useState(null);

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
      gridTemplateColumns: "100px repeat(7, 1fr)",
      gridAutoRows: "40px",
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
  };

  const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

  useEffect(() => {
    const getUserSchedule = async () => {
      try {
        const response = await fetch("http://localhost:8080/schedule/get/current", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          const error = await response.text();
          setAlert({ message: error, type: "fail" });
          throw new Error(error);
        }

        const data = await response.json();
        setScheduleData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setAlert({ message: "Failed to fetch schedule", type: "fail" });
      }
    };

    getUserSchedule();
  }, []);

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

  const getTimeRow = (timeString) => {
    const [hour, minute] = timeString.split(":").map(Number);
    return hour * 2 + (minute === 30 ? 1 : 0) + 1;
  };

  return (
    <div style={styles.container}>
      <h2>Weekly Timetable</h2>
      {alert && <div style={{ color: "red" }}>{alert.message}</div>}
      <div style={styles.timetable}>
        <div style={styles.timeLabel}></div>
        {daysOfWeek.map(day => (
          <div key={day} style={styles.dayHeader}>{day}</div>
        ))}
        {timeSlots.map((time, index) => (
          <div key={index} style={styles.timeLabel}>{time}</div>
        ))}
        {Array.from({ length: 7 }).map((_, dayIndex) => (
          timeSlots.map((_, slotIndex) => (
            <div key={`${dayIndex}-${slotIndex}`} style={{
              ...styles.timeSlot,
              gridColumn: dayIndex + 2,
              gridRow: slotIndex + 2,
            }}></div>
          ))
        ))}
        {scheduleDatas.map((event, index) => {
          const dayIndex = daysOfWeek.indexOf(event.dayOfWeek);
          const row = getTimeRow(event.scheduleTime);
          if (dayIndex === -1) return null;
          return (
            <div key={`event-${index}`} style={{
              ...styles.event,
              gridColumn: dayIndex + 2,
              gridRow: row,
            }}>
              {event.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timetable;
