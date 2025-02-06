import React, { useState } from "react";

const CheckoutModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  // Local state for the form fields.
  const [formData, setFormData] = useState({
    dayOfWeek: "",
    scheduleTime: "",
    name: "",
    category: "",
    inviteUser: "" // New field for inviting a user
  });

  // Handle input changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeBtnStyle} onClick={onClose}>
          X
        </button>
        <h3>Checkout Details</h3>
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
          {/* New Dropdown Field for Inviting a User */}
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
