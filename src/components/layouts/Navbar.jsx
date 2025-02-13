import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import AlertDialog from "../../components/dialogs/AlertDialog";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const dropdownRef = useRef(null);
  const { logOut } = useAuth();
  const navigate = useNavigate(); 

  const styles = {
    navbar: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 32px",
      backgroundColor: "#fff",
      borderBottom: "1px solid #ddd",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    navLinks: {
      display: "flex",
      listStyle: "none",
      margin: 0,
      padding: 0,
      gap: "24px",
    },
    navLink: {
      textDecoration: "none",
      color: "#555",
      fontWeight: 500,
      transition: "color 0.2s",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
    },
    searchInput: {
      padding: "8px 12px",
      border: "none",
      outline: "none",
      width: "200px",
    },
    searchButton: {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "8px 12px",
      fontSize: "16px",
    },
    iconsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      position: "relative", // Needed for dropdown positioning
    },
    icon: {
      position: "relative",
      fontSize: "20px",
      color: "#555",
      cursor: "pointer",
    },
    badge: {
      position: "absolute",
      top: "-6px",
      right: "-6px",
      backgroundColor: "#f44",
      color: "#fff",
      fontSize: "10px",
      fontWeight: "bold",
      borderRadius: "50%",
      padding: "2px 6px",
    },
    dropdown: {
      position: "absolute",
      top: "40px", // Adjust to align under the user icon
      right: "0",
      backgroundColor: "#fff",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      width: "160px",
      padding: "8px 0",
      display: "flex",
      flexDirection: "column",
      zIndex: 1000,
    },
    dropdownItem: {
      padding: "10px 16px",
      textDecoration: "none",
      color: "#333",
      fontWeight: "500",
      transition: "background 0.2s",
      cursor: "pointer",
    },
    dropdownItemHover: {
      backgroundColor: "#f5f5f5",
    },
  };


  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOutHandle = async () => {
    try {
      const response = await fetch(`http://localhost:8080/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: Ensures cookies are sent & removed
      });
  
      if (response.ok) {
        const responseData = await response.text();
        
        logOut();
  
        // Show the success alert immediately
        setAlert({ message: responseData, type: "success" });
  
        // After 1 second, navigate and clear the alert
        setTimeout(() => {
          navigate("/signup"); 
          setAlert({ message: "", type: "" }); // Clear alert
        }, 1000);
      } else {
        const errorText = await response.text();
        setAlert({ message: errorText, type: "fail" });
  
        // Automatically clear fail alert after 3 seconds
        setTimeout(() => {
          setAlert({ message: "", type: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({ message: error.message, type: "fail" });
  
      // Automatically clear error alert after 3 seconds
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
    }
  };
  
  

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logo}>Exclusive</div>

      {/* Navigation Links */}
      <ul style={styles.navLinks}>
        <li>
          <Link to="/home" style={styles.navLink}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/contact" style={styles.navLink}>
            Contact
          </Link>
        </li>
        <li>
          <a href="/about" style={styles.navLink}>
            About
          </a>
        </li>
        <li>
          <Link to="/signup" style={styles.navLink}>
            Sign Up
          </Link>
        </li>
        <Link to="/timetable" style={styles.navLink}>
          Time Table
        </Link>
      </ul>

      {/* Search Bar */}
      <div style={styles.searchBar}>
        <input type="text" placeholder="What are you looking for?" style={styles.searchInput} />
        <button style={styles.searchButton}>🔍</button>
      </div>

      {/* Icons */}
      <div style={styles.iconsContainer}>
        {/* Like Icon */}
        <div style={styles.icon}>
          <FaHeart />
          <span style={styles.badge}>2</span>
        </div>

        {/* Cart Icon */}
        <Link to="/cart" style={styles.icon}>
          <FaShoppingCart />
          <span style={styles.badge}>3</span>
        </Link>

        {/* User Icon with Dropdown */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <div style={styles.icon} onClick={toggleDropdown}>
            <FaUser />
          </div>
          {showDropdown && (
            <div style={styles.dropdown}>
              <Link to="/profile" style={styles.dropdownItem}>
                View Profile
              </Link>
              <Link to="/settings" style={styles.dropdownItem}>
                Settings
              </Link>
              <div style={{ ...styles.dropdownItem, ...styles.dropdownItemHover }} onClick={logOutHandle}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Show alert messages */}
      {alert.message && <AlertDialog message={alert.message} type={alert.type} />}
    </nav>
  );
};

export default Navbar;
