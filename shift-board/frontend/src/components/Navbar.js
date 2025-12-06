// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div
        className="nav-title"
        onClick={() => navigate("/dashboard")}
      >
        Employee Shift Board
      </div>

      <div className="nav-actions">
        {role === "admin" && (
          <button
            className="btn btn-outline"
            onClick={() => navigate("/create-shift")}
          >
            + Create Shift
          </button>
        )}
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
