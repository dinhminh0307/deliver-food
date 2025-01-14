import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
      {/* Left Section: Image */}
      <div style={styles.imageContainer}>
        <img
          src="src/assets/heart.jpeg"
          alt="Sign Up Illustration"
          style={{ maxWidth: "100%" }}
        />
      </div>

      {/* Right Section: Sign-Up Form */}
      <div style={styles.formContainer}>
        <h2>Create an account</h2>
        <p>Enter your details below</p>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email or Phone Number"
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Create Account
          </button>
          <button style={styles.googleButton}>
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
