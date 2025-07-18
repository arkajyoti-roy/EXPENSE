import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Registration.jsx";
import LandingPage from "./LandingPage.jsx";
import AllComp from "./AllComp.jsx";
import ExpenseTrackerLoader from "./ExpenseTrackerLoader.jsx";
import { useState, useEffect } from "react";
  import { ToastContainer } from 'react-toastify';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const EXPIRY_MS = 893000; // 14.88 minutes

  // 🧪 Clear token if expired
  useEffect(() => {
    const checkExpiry = () => {
      const expiry = parseInt(localStorage.getItem("tokenExpiry") || "0", 10);
      if (Date.now() > expiry) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        setToken(null);
      }
    };

    checkExpiry(); // Run on load
    const interval = setInterval(checkExpiry, 5000); // Check every 5s
    return () => clearInterval(interval);
  }, []);

  // 🧥 Update token on storage change (e.g. login, logout, expiry)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 📥 Intercept token setting and apply expiry
  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "token") {
        setToken(value);
        const expiry = Date.now() + EXPIRY_MS;
        originalSetItem.call(this, "tokenExpiry", expiry.toString());
      }
    };
    return () => {
      localStorage.setItem = originalSetItem;
    };
  }, []);

  // ⏳ Show loader for 1.05 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1050);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ExpenseTrackerLoader />;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home/*" element={token ? <AllComp /> : <Navigate to="/login" replace />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/auth"
            element={<Navigate to={token ? "/home" : "/login"} replace />}
          />
          <Route
            path="/home"
            element={token ? <AllComp /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
           <ToastContainer />

      <footer className="text-center text-gray-500 text-xs p-4 -mt-12">
        &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
      </footer>
    </>
  );
}

export default App;
