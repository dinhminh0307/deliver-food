import React from "react";

const AlertDialog = ({ message, type }) => {
  const styles = {
    alertBox: {
      padding: "12px 20px",
      borderRadius: "5px",
      marginBottom: "15px",
      textAlign: "center",
      fontWeight: "bold",
      maxWidth: "400px",
      margin: "auto",
    },
    success: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    warning: {
      backgroundColor: "#fff3cd",
      color: "#856404",
      border: "1px solid #ffeeba",
    },
    fail: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
  };

  return (
    <div style={{ ...styles.alertBox, ...styles[type] }}>
      {message}
    </div>
  );
};

export default AlertDialog;