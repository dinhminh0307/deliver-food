import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#000",
      color: "#fff",
      padding: "20px 40px",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    column: {
      flex: "1 1 200px",
      margin: "10px",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    text: {
      marginBottom: "10px",
      fontSize: "14px",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
    },
    input: {
      padding: "10px",
      border: "1px solid #fff",
      borderRadius: "4px",
      outline: "none",
      marginRight: "5px",
      flex: 1,
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#fff",
      color: "#000",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    qrContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    socialIcons: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
    socialIcon: {
      color: "#fff",
      fontSize: "18px",
      textDecoration: "none",
    },
    bottomBar: {
      textAlign: "center",
      marginTop: "20px",
      borderTop: "1px solid #333",
      padding: "10px 0",
      fontSize: "12px",
    },
  };

  return (
    <footer style={styles.footer}>
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
        <p style={styles.text}>
          111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
        </p>
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
            src="https://via.placeholder.com/100" // Replace with actual QR code images
            alt="Google Play QR"
            style={{ marginBottom: "10px" }}
          />
          <img
            src="https://via.placeholder.com/100" // Replace with actual QR code images
            alt="App Store QR"
          />
        </div>
        <div style={styles.socialIcons}>
          <a href="/" style={styles.socialIcon}>
            Facebook
          </a>
          <a href="/" style={styles.socialIcon}>
            Twitter
          </a>
          <a href="/" style={styles.socialIcon}>
            Instagram
          </a>
          <a href="/" style={styles.socialIcon}>
            LinkedIn
          </a>
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
