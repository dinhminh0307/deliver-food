import React, { useState, useEffect } from "react";
import CartItem from "../../components/forms/CartItem";
import AlertDialog from "../../components/dialogs/AlertDialog";
import CheckoutModal from "../../components/forms/CheckoutModal";

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

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await fetch("http://localhost:8080/cart/currentUser", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error(await response.text());
        }
  
        const data = await response.json();
        setCartItems(data?.products ?? []);
        setCartTotal(data?.price ?? 0);
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setAlert({ message: "Failed to fetch cart", type: "fail" });
      }
    };
  
    fetchUserCart();
  }, []);
  
  const removeItem = async (productId, cartId) => {
    if (!productId || !cartId) {
      setAlert({ message: "Invalid product or cart ID.", type: "warning" });
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:8080/cart/delete/item?productId=${productId}&cartId=${cartId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
  
      if (!response.ok) {
        const errorResponse = await response.text();
        setAlert({ message: errorResponse, type: "fail" });
        throw new Error(errorResponse);
      }
  
      const data = await response.json();
      setCartItems(data?.products ?? []);
      setCartTotal(data?.price ?? 0);
      setAlert({ message: "Item removed successfully", type: "success" });
    } catch (error) {
      console.error("Error removing item:", error);
      setAlert({ message: error, type: "fail" });
    }
  };

  // Handle modal form submission.
  const handleModalSubmit = (formData) => {
    // Build your request body using the form values.
    // Note that accountIds and productIds would typically be derived from your current user/cart context.
    const requestBody = {
      dayOfWeek: formData.dayOfWeek,
      scheduleTime: formData.scheduleTime,
      name: formData.name,
      category: formData.category,
      // accountIds and productIds are excluded from the form;
      // you can add them here if needed.
    };
    console.log("Request Body:", requestBody);

    setTimeout(() => {
      setModalOpen(false);
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <h2>Your Cart</h2>
      {alert.message && <AlertDialog message={alert.message} type={alert.type} />}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHead}>
            <th style={styles.tableCell}>Product</th>
            <th style={styles.tableCell}>Price</th>
            <th style={styles.tableCell}>Description</th>
            <th style={styles.tableCell}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                cartId={cart.cartId}
                removeItem={removeItem}
              />
            ))
          ) : (
            <tr>  
              <td colSpan="4" style={{ textAlign: "center" }}>
                Your cart is empty
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={styles.coupon}>
        <input type="text" placeholder="Coupon Code" style={styles.couponInput} />
        <button style={styles.button}>Apply Coupon</button>
      </div>

      <div style={styles.cartSummary}>
        <div style={styles.summaryRow}>
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div style={styles.summaryRow}>
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <button
          style={{ ...styles.button, width: "100%" }}
          onClick={() => setModalOpen(true)}
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Render the modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Cart;
