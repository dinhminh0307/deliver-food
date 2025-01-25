import React, { useState } from "react";
import axios from "axios";

const AddFormModal = ({ onClose, formType }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    productType: "",
    type: "games",  // Default value for dropdown
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await fetch(`http://localhost:8080/product/add?type=${formData.type}&productType=${formData.productType}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important to include cookies
          body: JSON.stringify({
            name: formData.name,
            price: formData.price,
            description: formData.description,
          }),
        });
      
        if (response.ok) {
          alert("Added product successfully");
        } else {
          const errorText = await response.text();
          alert("Admin Login failed: " + errorText);
        }
      } catch (error) {
        console.error("Admin Login error:", error);
        alert("Something went wrong. Please try again.");
      }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-2xl font-bold mb-4">
          Add New {formType === "product" ? "Product" : "Customer"}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              {formType === "product" ? "Price" : "Email"}
            </label>
            <input
              type="text"
              name="price"
              placeholder={formType === "product" ? "Enter price" : "Enter email"}
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Product Type</label>
            <input
              type="text"
              name="productType"
              placeholder="Enter product type (e.g., horror, action)"
              value={formData.productType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="games">Games</option>
              <option value="movies">Movies</option>
              <option value="foods">Foods</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFormModal;
