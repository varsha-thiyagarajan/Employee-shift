// src/pages/CreateShift.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../utils/api";

function CreateShift() {
  const navigate = useNavigate();

  const [employeeName, setEmployeeName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const handleCreate = async () => {
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/shifts",
        {
          employeeName,
          employeeCode,
          department,
          date,
          startTime,
          endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Shift created!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Server error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="card">
          <h2>Create Shift</h2>
          <p className="dashboard-subtitle">
            Assign a new shift to an employee. Business rules will be validated automatically.
          </p>

          <div className="form-group">
            <label className="form-label">Employee Name</label>
            <input
              type="text"
              className="form-input"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Ex: Varsha"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Employee Code</label>
            <input
              type="text"
              className="form-input"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              placeholder="Ex: E102"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>Engineering</option>
              <option>Sales</option>
              <option>HR</option>
              <option>Support</option>
              <option>Operations</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Start Time</label>
            <input
              type="time"
              className="form-input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">End Time</label>
            <input
              type="time"
              className="form-input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={handleCreate}>
            Save Shift
          </button>

          {message && (
            <p style={{ marginTop: "12px", fontSize: "14px", color: "#e53935" }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateShift;
