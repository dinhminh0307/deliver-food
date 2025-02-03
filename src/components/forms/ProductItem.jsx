import React, { useState } from "react";

const ProductItem = ({ id, image, name, description, price }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      textAlign: "center",
      padding: "10px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
    },
    image: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "8px",
    },
    name: {
      fontSize: "20px",
      fontWeight: "bold",
      margin: "10px 0 5px",
    },
    description: {
      fontSize: "16px",
      margin: "5px 0",
    },
    price: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#e63946",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "400px",
      textAlign: "center",
      position: "relative",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: loading ? "#bbb" : "#f44",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: loading ? "not-allowed" : "pointer",
      marginTop: "20px",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "15px",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    message: {
      marginTop: "15px",
      fontWeight: "bold",
    },
  };

  const handleAddToCart = async () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
  
    // ✅ Correcting the JSON format to match Postman request
    const productPayload = {
      productId: id, // ✅ Ensure correct key name
      name: name,
      price: price,
      description: description,
    };
  
    try {
      const response = await fetch("http://localhost:8080/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Ensures cookies are sent
        body: JSON.stringify(productPayload), // ✅ Correct payload format
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Read error message
        throw new Error(errorText || "Failed to add item to cart.");
      }
  
      const contentType = response.headers.get("content-type");
      let data;
  
      if (contentType && contentType.includes("application/json")) {
        data = await response.json(); // ✅ Parse response if JSON
        setSuccessMessage("Product added to cart successfully!");
        console.log("Cart Response:", data);
      } else {
        setSuccessMessage("Product added to cart successfully (no response body).");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      setErrorMessage("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <>
      <div
        style={styles.card}
        onClick={() => setShowModal(true)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img src={image} alt={name} style={styles.image} />
        <p style={styles.name}>{name}</p>
        <p style={styles.description}>{description}</p>
        <p style={styles.price}>${price.toFixed(2)}</p>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <span style={styles.closeButton} onClick={() => setShowModal(false)}>
              &times;
            </span>
            <img src={image} alt={name} style={styles.image} />
            <h2 style={styles.name}>{name}</h2>
            <p style={styles.description}>{description}</p>
            <p style={styles.price}>${price.toFixed(2)}</p>
            <button style={styles.button} onClick={handleAddToCart} disabled={loading}>
              {loading ? "Adding..." : "Add to Cart"}
            </button>

            {successMessage && <p style={{ ...styles.message, color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ ...styles.message, color: "red" }}>{errorMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
