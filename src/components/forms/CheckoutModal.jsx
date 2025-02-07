import React, { useState, useEffect } from "react";
import AlertDialog from "../../components/dialogs/AlertDialog";

const CheckoutModal = ({ isOpen, onClose, onSubmit }) => {
  // Local state for the current user
  const [user, setUser] = useState(null);
  // Local state for list of users to populate the dropdown
  const [listUsers, setListUsers] = useState([]);
  // Local state for alerts
  const [alert, setAlert] = useState({ message: "", type: "" });
  
  // Initial state for the form fields.
  const initialFormState = {
    dayOfWeek: "",
    scheduleTime: "",
    name: "",
    category: "",
    inviteUser: -1, // Field for inviting a user
    accountIds: []
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch current user and list of users when the component mounts
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
        setAlert({ message: "Failed to fetch user", type: "fail" });
      }
    };

    const getListUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/get?page=0&size=10", {
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
        // Assuming data is an array. If it's wrapped in an object, adjust accordingly.
        setListUsers(data.content);
      } catch (error) {
        console.error("Error fetching list of users:", error);
        setAlert({ message: "Failed to fetch list user", type: "fail" });
      }
    };

    getCurrentUser();
    getListUser();
  }, []);

  // Handle input changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert formData.inviteUser from string to integer
    const inviteUserId = parseInt(formData.inviteUser, 10);

    formData.accountIds = [user.account_id, inviteUserId]
    if (onSubmit) {
      onSubmit({ ...formData, user });
    }
    
    setAlert({ message: "Form submitted successfully", type: "success" });
    
    // Reset the modal form fields
    setFormData(initialFormState);
    setAlert({ message: "", type: "" });
  };

  const closeModal = () => {
    // Reset the modal form fields and clear alerts.
    setFormData(initialFormState);
    setAlert({ message: "", type: "" });
    
    // Call the onClose prop to notify the parent to close the modal
    if (onClose) {
      onClose();
    }
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
        <button style={closeBtnStyle} onClick={closeModal}>
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
          {/* Dropdown Field for Inviting a User dynamically populated */}
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
              {listUsers &&
                listUsers.filter((usr) => usr.account_id !== user.account_id).map((usr) => (
                  <option key={usr.account_id} value={usr.account_id}>
                    {usr.firstName + " " + usr.lastName}
                  </option>
                ))}
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
