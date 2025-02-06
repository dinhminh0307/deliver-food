import React, { useState, useEffect } from "react";
import AlertDialog from "../../components/dialogs/AlertDialog";

const CheckoutModal = ({ isOpen, onClose, onSubmit }) => {
  // Local state for the current user
  const [user, setUser] = useState(null);
  // Local state for alerts
  const [alert, setAlert] = useState({ message: "", type: "" });
  // Local state for the form fields.
  const [formData, setFormData] = useState({
    dayOfWeek: "",
    scheduleTime: "",
    name: "",
    category: "",
    inviteUser: "" // Field for inviting a user
  });

  // Fetch current user data when the component mounts
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/currentUser", {
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
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Optionally, set a more descriptive error message here
        setAlert({ message: "Failed to fetch user", type: "fail" });
      }
    };

    getCurrentUser();
  }, []);

  // Handle input changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    // If an onSubmit callback is provided, pass the form data and user data
    if (onSubmit) {
      onSubmit({ ...formData, user });
    }
    console.log("User Info:", user);
    setAlert({ message: "Form submitted successfully", type: "success" });
    // Optionally, you can close the modal after a successful submission:
    // onClose();
  };

  // Inline styles for the modal.
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%",
    position: "relative"
  };

  const closeBtnStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer"
  };

  const formGroupStyle = {
    marginBottom: "15px"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px"
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

  // If the modal is not open, don't render anything.
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeBtnStyle} onClick={onClose}>
          X
        </button>
        <h3>Checkout Details</h3>
        {alert.message && <AlertDialog message={alert.message} type={alert.type} />}
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="dayOfWeek">
              Day of Week
            </label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="">Select Day</option>
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="scheduleTime">
              Schedule Time
            </label>
            <input
              type="time"
              id="scheduleTime"
              name="scheduleTime"
              value={formData.scheduleTime}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter name"
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter category"
            />
          </div>
          {/* Dropdown Field for Inviting a User */}
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="inviteUser">
              Invite User
            </label>
            <select
              id="inviteUser"
              name="inviteUser"
              value={formData.inviteUser}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select a user</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </select>
          </div>
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
