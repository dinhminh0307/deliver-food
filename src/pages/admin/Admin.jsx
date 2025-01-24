import React from "react";
import Sidebar from "../../components/bar/Side";
import Table from "../../components/layouts/Table";

const customersData = [
  { id: 1, fullName: "Alyvia Kelley", email: "a.kelley@gmail.com", status: "Approved", dob: "06/18/1978" },
  { id: 2, fullName: "Jaiden Nixon", email: "jaiden.n@gmail.com", status: "Approved", dob: "09/30/1963" },
  { id: 3, fullName: "Ace Foley", email: "ace.fo@yahoo.com", status: "Blocked", dob: "12/09/1985" },
  { id: 4, fullName: "Nikolai Schmidt", email: "nikolai.schmidt1964@outlook.com", status: "Rejected", dob: "03/22/1956" },
  { id: 5, fullName: "Clayton Charles", email: "me@clayton.com", status: "Approved", dob: "10/14/1971" },
];

const customerColumns = [
  { header: "#", accessor: "id" },
  { header: "Full Name", accessor: "fullName" },
  { header: "Status", accessor: "status" },
  { header: "E-Mail", accessor: "email" },
  { header: "Date of Birth", accessor: "dob" },
];

const CustomersPage = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h2 style={styles.title}>Customers</h2>
        <Table columns={customerColumns} data={customersData} actions={["view", "edit", "delete"]} />
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

export default CustomersPage;
