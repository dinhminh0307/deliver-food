import React, { useState, useEffect } from "react";
import AlertDialog from "../../components/dialogs/AlertDialog";

const ProductItem = ({ id, image, name, description, price }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    if (alert.message) {
      setAlert((prev) => ({ ...prev, visible: true }));
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.message]);

  const styles = {
    alertContainer: {
      position: "fixed",
      top: "10px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      width: "80%",
      maxWidth: "400px",
    },

    modalOverlay: {
      position: "fixed", // Ensure it covers the full screen
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000, // Make sure it's above other elements
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
  };

  const validateItemCart = async () => {
    if (!id) {
      setAlert({ message: "Invalid product ID.", type: "warning" });
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/cart/item/check?productId=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
  
      if (response.ok) {
        handleAddToCart();
        setAlert({ message: "Item is valid in cart.", type: "success" });
      } else {
        const errorText = await response.text();
        setAlert({ message: `Validation failed: ${errorText}`, type: "fail" });
      }
    } catch (error) {
      setAlert({ message: "Failed to validate item.", type: "fail" });
    }
    setShowModal(false);
  };
  
  const handleAddToCart = async () => {
    setLoading(true);
    setAlert({ message: "", type: "" });
  
    const productPayload = {
      productId: id,
      name: name,
      price: price,
      description: description,
    };
  
    try {
      const response = await fetch("http://localhost:8080/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(productPayload),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to add item to cart.");
      }
  
      setAlert({ message: "Product added to cart successfully!", type: "success" });
    } catch (error) {
      setAlert({ message: "Failed to add product. Please try again.", type: "fail" });
    } finally {
      setLoading(false);
    }
    
  };
  
  return (
    <>
      {alert.visible && (
        <div style={styles.alertContainer}>
          <AlertDialog message={alert.message} type={alert.type} />
        </div>
      )}
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
            <button style={styles.button} onClick={validateItemCart} disabled={loading}>
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
