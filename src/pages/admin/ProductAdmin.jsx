import React from "react";
import Sidebar from "../../components/bar/Side";
import Table from "../../components/layouts/Table";

const productData = [
  { id: 1, name: "Alyvia Kelley", price: "a.kelley@gmail.com", description: "Approved"},
  { id: 2, name: "Jaiden Nixon", price: "jaiden.n@gmail.com", description: "Approved"},
  { id: 3, name: "Ace Foley", price: "ace.fo@yahoo.com", description: "Blocked"},
  { id: 4, name: "Nikolai Schmidt", price: "nikolai.schmidt1964@outlook.com", description: "Rejected"},
  { id: 5, name: "Clayton Charles", price: "me@clayton.com", description: "Approved"},
];

const productColumns = [
  { header: "#", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Price", accessor: "price" },
  { header: "Description", accessor: "description" },
  
];

const ProductAdmin = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h2 style={styles.title}>Customers</h2>
        <Table columns={productColumns} data={productData} actions={["view", "edit", "delete"]} />
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
