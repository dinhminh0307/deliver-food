import React, { useState } from "react";

const CartItem = ({ item, handleQuantityChange, removeItem }) => {
  return (
    <tr style={{ borderBottom: "1px solid #ddd" }}>
      <td style={{ padding: "10px", textAlign: "center" }}>
        <img src={item.image} alt={item.name} style={{ width: "50px", marginRight: "10px" }} />
        {item.name}
      </td>
      <td style={{ padding: "10px", textAlign: "center" }}>${item.price}</td>
      <td style={{ padding: "10px", textAlign: "center" }}>
        <select
          value={item.quantity}
          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </td>
      <td style={{ padding: "10px", textAlign: "center" }}>${item.price * item.quantity}</td>
      <td style={{ padding: "10px", textAlign: "center" }}>
        <button onClick={() => removeItem(item.id)} style={{ padding: "10px 20px", backgroundColor: "#f44", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          ✕
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
