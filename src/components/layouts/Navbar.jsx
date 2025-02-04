import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa"; // Import icons from react-icons

const Navbar = () => {
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
    navLinkHover: {
      color: "#000",
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
      color: "555",
      fontSize: "16px",
    },
    iconsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
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
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logo}>Exclusive</div>

      {/* Navigation Links */}
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.navLink}>
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
        <input
          type="text"
          placeholder="What are you looking for?"
          style={styles.searchInput}
        />
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

        {/* User Icon */}
        <div style={styles.icon}>
          <FaUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
