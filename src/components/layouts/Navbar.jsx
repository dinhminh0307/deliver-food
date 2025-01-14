import React from "react";

const Navbar = () => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
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
    },
    navLinkItem: {
      margin: "0 15px",
    },
    navLink: {
      textDecoration: "none",
      color: "black",
      fontWeight: 500,
    },
    navLinkHover: {
      textDecoration: "underline",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
    },
    searchInput: {
      border: "1px solid #ddd",
      borderRadius: "4px",
      padding: "5px 10px",
      outline: "none",
      marginRight: "5px",
    },
    searchButton: {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Exclusive</div>
      <ul style={styles.navLinks}>
        <li style={styles.navLinkItem}>
          <a href="/" style={styles.navLink}>Home</a>
        </li>
        <li style={styles.navLinkItem}>
          <a href="/contact" style={styles.navLink}>Contact</a>
        </li>
        <li style={styles.navLinkItem}>
          <a href="/about" style={styles.navLink}>About</a>
        </li>
        <li style={styles.navLinkItem}>
          <a href="/signup" style={styles.navLink}>Sign Up</a>
        </li>
      </ul>
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="What are you looking for?"
          style={styles.searchInput}
        />
        <button style={styles.searchButton}>
          <span role="img" aria-label="search">🔍</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
