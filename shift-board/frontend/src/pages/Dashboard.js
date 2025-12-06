// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ShiftTable from "../components/ShiftTable";

function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="card">
          <div className="dashboard-header">
            <div>
              <h2>Dashboard</h2>
              <p className="dashboard-subtitle">
                View and manage employee shifts in one place.
              </p>
            </div>

            <div style={{ textAlign: "right", fontSize: "14px" }}>
              <div>Logged in as: <b>{role}</b></div>
            </div>
          </div>

          <ShiftTable />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
