import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/layouts/Navbar"; // Import the Navbar component
import SignUp from "./pages/auth/SignUp";
import Footer from "./components/layouts/Footer";
import Login from "./pages/auth/Login";
import Home from "./pages/Home/Home";
import Cart from "./pages/cart/Cart";
import Timetable from "./pages/Home/Timetable";
import CustomersTable from "./pages/admin/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <main style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/admin" element={<CustomersTable />} />
        </Routes>
      </main>
      <Footer />
      </Router> 
    </>
  );
}
export default App;
