import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertDialog from "../../components/dialogs/AlertDialog";

const EditModal = ({ isOpen, onClose, data, onSave }) => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  // Ensure modal is not rendered if not open
  if (!isOpen) return null;

  // ✅ Correctly update form data when data changes
  const [formData, setFormData] = useState({
    productId: data.productId,
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        productId: data.productId,
        name: data?.name || "",
        price: data?.price || "",
        description: data?.description || "",
        imageUrl: data?.imageUrl || "",
      });
    }
  }, [data]); // Updates formData when data prop changes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
        console.log(formData)
      const response = await fetch(`http://localhost:8080/product/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important to include cookies
        body: JSON.stringify(formData), // ✅ Sending updated formData instead of old data
      });

      if (response.ok) {
        setAlert({ message: "Edit successfully", type: "success" });
        console.log("Updated Data:", await response.json());
      } else {
        const errorText = await response.text();
        setAlert({ message: errorText, type: "fail" });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({ message: error.message, type: "fail" }); // ✅ Fix error handling
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      {alert.message && <AlertDialog message={alert.message} type={alert.type} />}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4 border-0 shadow-lg">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold text-dark">Edit Item</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSave} className="needs-validation" noValidate>
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
                <label className="form-label fw-medium text-dark">Price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium text-dark">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium text-dark">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Enter image URL"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="d-flex justify-content-between">
                <button type="button" onClick={onClose} className="btn btn-outline-primary w-50 me-2">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-50">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
