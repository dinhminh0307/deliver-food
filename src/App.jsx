import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/layouts/Navbar"; // Import the Navbar component
import SignUp from "./pages/auth/SignUp";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <SignUp />
      </main>
      <Footer />
    </>
  );
}
export default App;
