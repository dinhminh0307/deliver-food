import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/layouts/Navbar"; // Import the Navbar component
import SignUp from "./pages/auth/SignUp";
import Footer from "./components/layouts/Footer";
import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <main style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
      </Router>
    </>
  );
}
export default App;
