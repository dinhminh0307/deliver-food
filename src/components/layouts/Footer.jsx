import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      width: "100vw",
      minWidth: "100%",
      backgroundColor: "#333",
      color: "#fff",
      padding: "10px 20px", // Reduced padding to make it smaller
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      maxWidth: "1100px", // Slightly reduced width for better compactness
      width: "100%",
      paddingBottom: "5px", // Reduced extra spacing
    },
    column: {
      flex: "1 1 180px", // Reduced column width for better fit
      margin: "5px", // Reduced margin
      fontSize: "13px", // Reduced font size for a more compact layout
    },
    title: {
      fontSize: "16px", // Smaller title
      fontWeight: "bold",
      marginBottom: "6px",
    },
    text: {
      marginBottom: "6px", // Reduced space between text elements
      fontSize: "12px", // Smaller font size
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
    },
    input: {
      padding: "6px", // Reduced padding
      border: "1px solid #fff",
      borderRadius: "4px",
      outline: "none",
      marginRight: "5px",
      fontSize: "12px", // Smaller font
      flex: 1,
    },
    button: {
      padding: "6px 10px", // Smaller button
      backgroundColor: "#fff",
      color: "#000",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px", // Smaller text
    },
    qrContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    socialIcons: {
      display: "flex",
      gap: "8px", // Reduced gap
      marginTop: "5px", // Reduced top spacing
    },
    socialIcon: {
      color: "#fff",
      fontSize: "14px", // Smaller icon size
      textDecoration: "none",
    },
    bottomBar: {
      textAlign: "center",
      marginTop: "10px", // Reduced margin to make it smaller
      borderTop: "1px solid #555",
      padding: "5px 0",
      fontSize: "10px", // Smaller text
      width: "100%",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Column 1 */}
        <div style={styles.column}>
          <div style={styles.title}>Exclusive</div>
          <p style={styles.text}>Subscribe</p>
          <p style={styles.text}>Get 10% off your first order</p>
          <div style={styles.inputContainer}>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
            />
            <button style={styles.button}>→</button>
          </div>
        </div>

        {/* Column 2 */}
        <div style={styles.column}>
          <div style={styles.title}>Support</div>
          <p style={styles.text}>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p style={styles.text}>exclusive@gmail.com</p>
          <p style={styles.text}>+88015-88888-9999</p>
        </div>

        {/* Column 3 */}
        <div style={styles.column}>
          <div style={styles.title}>Account</div>
          <p style={styles.text}>My Account</p>
          <p style={styles.text}>Login / Register</p>
          <p style={styles.text}>Cart</p>
          <p style={styles.text}>Wishlist</p>
          <p style={styles.text}>Shop</p>
        </div>

        {/* Column 4 */}
        <div style={styles.column}>
          <div style={styles.title}>Quick Link</div>
          <p style={styles.text}>Privacy Policy</p>
          <p style={styles.text}>Terms Of Use</p>
          <p style={styles.text}>FAQ</p>
          <p style={styles.text}>Contact</p>
        </div>

        {/* Column 5 */}
        <div style={styles.column}>
          <div style={styles.title}>Download App</div>
          <p style={styles.text}>Save $3 with App New User Only</p>
          <div style={styles.qrContainer}>
            <img
              src="https://via.placeholder.com/80" // Reduced size for compactness
              alt="Google Play QR"
              style={{ marginBottom: "5px" }}
            />
            <img
              src="https://via.placeholder.com/80" // Reduced size for compactness
              alt="App Store QR"
            />
          </div>
          <div style={styles.socialIcons}>
            <a href="/" style={styles.socialIcon}>Facebook</a>
            <a href="/" style={styles.socialIcon}>Twitter</a>
            <a href="/" style={styles.socialIcon}>Instagram</a>
            <a href="/" style={styles.socialIcon}>LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        © Copyright Rimel 2022. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
