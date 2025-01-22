import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    password: "",
    imageUrl: "http://example.com/profile.jpg"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedData = {
      ...formData,
      dob: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : ""
    };
  
    console.log("Sending data:", formattedData);  // Debugging log
  
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
  
      if (response.ok) {
        alert("Account created successfully!");
      } else {
        alert("Error creating account. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };
  

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "1200px",
      margin: "auto",
      padding: "20px",
      flexWrap: "wrap",
    },
    imageContainer: {
      flex: "1 1 50%",
      textAlign: "center",
      padding: "20px",
    },
    formContainer: {
      flex: "1 1 50%",
      padding: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "400px",
      margin: "auto",
    },
    input: {
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "4px",
      outline: "none",
    },
    button: {
      padding: "10px",
      margin: "10px 0",
      backgroundColor: "#e63946",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    googleButton: {
      padding: "10px",
      margin: "10px 0",
      backgroundColor: "#fff",
      color: "#000",
      border: "1px solid #ddd",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    googleLogo: {
      marginRight: "10px",
    },
    textCenter: {
      textAlign: "center",
      marginTop: "20px",
    },
    link: {
      color: "#e63946",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img
          src="src/assets/heart.jpeg"
          alt="Sign Up Illustration"
          style={{ maxWidth: "100%" }}
        />
      </div>

      <div style={styles.formContainer}>
        <h2>Create an account</h2>
        <p>Enter your details below</p>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            style={styles.input}
            value={formData.firstName}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            style={styles.input}
            value={formData.lastName}
            required
            onChange={handleChange}/
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            style={styles.input}
            value={formData.phoneNumber}
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={styles.input}
            value={formData.email}
            required
            onChange={handleChange}
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            style={styles.input}
            value={formData.dateOfBirth}
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={styles.input}
            value={formData.password}
            required
            onChange={handleChange}
          />
          <button type="submit" style={styles.button}>
            Create Account
          </button>
          <button type="button" style={styles.googleButton}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              style={{ width: "20px", height: "20px", ...styles.googleLogo }}
            />
            Sign up with Google
          </button>
        </form>
        <div style={styles.textCenter}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
