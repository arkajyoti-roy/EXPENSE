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
import { useState, useEffect } from "react";
import ExpenseTrackerLoader from "./ExpenseTrackerLoader.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader for 1.7 seconds
    const timer = setTimeout(() => setLoading(false), 1050);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "token") {
        setToken(value);
      }
    };
    return () => {
      localStorage.setItem = originalSetItem;
    };
  }, []);

  if (loading) {
    return <ExpenseTrackerLoader />;
  }

  return (
    <>
      <Router>
        <Routes>
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

      <footer className="text-center text-gray-500 text-xs p-4 -mt-12">
        &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
      </footer>
    </>
  );
}

export default App;
