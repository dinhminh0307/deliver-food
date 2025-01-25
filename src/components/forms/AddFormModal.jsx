import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
      const response = await fetch(
        `http://localhost:8080/product/add?type=${formData.type}&productType=${formData.productType}`,
        {
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
        }
      );

      if (response.ok) {
        alert("Added product successfully");
        onClose();
      } else {
        const errorText = await response.text();
        alert("Product addition failed: " + errorText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4 border-0 shadow-lg">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold text-dark">
              Add New {formType === "product" ? "Product" : "Customer"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="mb-3">
                <label className="form-label fw-medium text-dark">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium text-dark">
                  {formType === "product" ? "Price" : "Email"}
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder={formType === "product" ? "Enter price" : "Enter email"}
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium text-dark">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium text-dark">Product Type</label>
                <input
                  type="text"
                  name="productType"
                  placeholder="Enter product type (e.g., horror, action)"
                  value={formData.productType}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium text-dark">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="games">Games</option>
                  <option value="movies">Movies</option>
                  <option value="foods">Foods</option>
                </select>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline-primary w-50 me-2"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-50">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFormModal;
