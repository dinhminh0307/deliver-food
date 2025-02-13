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
        <Navbar />
        <main style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
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
            <Route path="/product" element={<ProductAdmin/>} />
            {/* <Route path="/analytics" element={<h1>Analytics Page</h1>} />
            <Route path="/messages" element={<h1>Messages Page</h1>} />
            <Route path="/setting" element={<h1>Settings Page</h1>} />
            <Route path="/help_centre" element={<h1>Help Centre Page</h1>} /> */}

          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
