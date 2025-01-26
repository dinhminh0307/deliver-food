import React from "react";

const ProductItem = ({ image, name, description, price }) => {
  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      textAlign: "center",
      padding: "10px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
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
  };

  return (
    <div style={styles.card}>
      <img src={image} alt={name} style={styles.image} />
      <p style={styles.name}>{name}</p>
      <p style={styles.description}>{description}</p>
      <p style={styles.price}>${price}</p>
    </div>
  );
};

export default ProductItem;
