import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ROLE = Object.freeze({
    ADMIN: 'ADMIN',
    USER: 'USER'
});

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: "",
    dob: null,
    password: "",
    imageUrl: null,
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const preLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:8080/auth?email=${formData.email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const role = await response.text();  // Read the response as text

            console.log("Received role:", role.trim());  // Debugging output

            if (role.trim() === ROLE.ADMIN) {
                await handleAdminLogin();
            } else if (role.trim() === ROLE.USER) {
                await handleUserLogin();
            } else {
                alert("Unknown role received: " + role);
            }
        } else {
            const errorText = await response.text();
            alert("Login failed: " + errorText);
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
    }
};


  const handleAdminLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/loginAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important to include cookies
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert("Admin Login successful!");
        navigate("/admin");
      } else {
        const errorText = await response.text();
        alert("Admin Login failed: " + errorText);
      }
    } catch (error) {
      console.error("Admin Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  const handleUserLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important to include cookies
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert("User Login successful!");
        navigate("/home");
      } else {
        const errorText = await response.text();
        alert("User Login failed: " + errorText);
      }
    } catch (error) {
      console.error("User Login error:", error);
      alert("Something went wrong. Please try again.");
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
          alt="Login Illustration"
          style={{ maxWidth: "100%" }}
        />
      </div>

      <div style={styles.formContainer}>
        <h2>Log in to your account</h2>
        <p>Enter your credentials below</p>
        <form style={styles.form} onSubmit={preLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>
        <div style={styles.textCenter}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
