import React, { useState } from "react";
import CartItem from "../../components/forms/CartItem";

const Cart = () => {
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "auto",
      padding: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    tableHead: {
      backgroundColor: "#f9f9f9",
      textAlign: "left",
    },
    tableCell: {
      padding: "10px",
      textAlign: "center",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#f44",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    coupon: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    couponInput: {
      flex: "1",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    cartSummary: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      marginTop: "20px",
      maxWidth: "300px",
      marginLeft: "auto",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
  };

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "LCD Monitor", price: 650, quantity: 1, image: "https://via.placeholder.com/100" },
    { id: 2, name: "H1 Gamepad", price: 550, quantity: 2, image: "https://via.placeholder.com/100" },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>Your Cart</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHead}>
            <th style={styles.tableCell}>Product</th>
            <th style={styles.tableCell}>Price</th>
            <th style={styles.tableCell}>Quantity</th>
            <th style={styles.tableCell}>Subtotal</th>
            <th style={styles.tableCell}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} handleQuantityChange={handleQuantityChange} removeItem={removeItem} />
          ))}
        </tbody>
      </table>

      <div style={styles.coupon}>
        <input type="text" placeholder="Coupon Code" style={styles.couponInput} />
        <button style={styles.button}>Apply Coupon</button>
      </div>

      <div style={styles.cartSummary}>
        <div style={styles.summaryRow}>
          <span>Subtotal:</span>
          <span>${calculateSubtotal()}</span>
        </div>
        <div style={styles.summaryRow}>
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div style={styles.summaryRow}>
          <span>Total:</span>
          <span>${calculateSubtotal()}</span>
        </div>
        <button style={{ ...styles.button, width: "100%" }}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
