import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar"; // Import the Navbar component
import Footer from "./components/layouts/Footer";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Home from "./pages/Home/Home";
import Cart from "./pages/cart/Cart";
import Timetable from "./pages/Home/Timetable";
import ProductAdmin from "./pages/admin/ProductAdmin";
import CustomersTable from "./pages/admin/Admin";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          {/* Navbar with fixed height */}
          <div style={{ flexShrink: 0 }}>
            <Navbar />
          </div>

          {/* Main Content (scrollable) */}
          <main
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<SignUp />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/timetable" element={<Timetable />} />

              {/* Admin Routes */}
              <Route path="/customers" element={<CustomersTable />} />
              <Route path="/product" element={<ProductAdmin />} />
            </Routes>
          </main>

          {/* Footer with fixed height */}
          <div style={{ flexShrink: 0 }}>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
