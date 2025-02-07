import React, { useState, useEffect } from "react";
import Sidebar from "../../components/bar/Side";
import Table from "../../components/layouts/Table";

const customerData = [
  { id: 1, name: "John Doe", price: "johndoe@gmail.com", description: "Active" },
  { id: 2, name: "Jane Smith", price: "janesmith@yahoo.com", description: "Inactive" },
];

const productColumns = [
  { header: "#", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Price", accessor: "price" },
  { header: "Description", accessor: "description" },
];

const customerColumns = [
  { header: "#", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "price" },
  { header: "Status", accessor: "description" },
];

const ProductAdmin = () => {
  const [tableType, setTableType] = useState("product");
  const [productData, setProductData] = useState([]);

  // Fetch product data from the backend API
  const fetchProductData = async () => {
    try {
      const response = await fetch("http://localhost:8080/product/all?page=0&size=10", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important to include cookies
      });

      if (response.ok) {
        const data = await response.json();
        setProductData(data.content); // Assuming API returns paginated content
      } else {
        const errorText = await response.text();
        alert("Failed to fetch product data: " + errorText);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    if (tableType === "product") {
      fetchProductData();
    }
  }, [tableType]);

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h2 style={styles.title}>{tableType === "product" ? "Products" : "Customers"}</h2>
        <Table
          columns={tableType === "product" ? productColumns : customerColumns}
          data={tableType === "product" ? productData : customerData}
          actions={["view", "edit", "delete"]}
          tableType={tableType}
          toggleTableType={() => setTableType(tableType === "product" ? "customer" : "product")}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
};

export default ProductAdmin;
