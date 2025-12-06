// src/components/ShiftTable.js
import React, { useEffect, useState } from "react";
import api from "../utils/api";

function ShiftTable() {
  const [shifts, setShifts] = useState([]);
  const role = localStorage.getItem("role");

  const loadShifts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/shifts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShifts(res.data);
    } catch (err) {
      console.error("Shift load error:", err);
    }
  };

  const deleteShift = async (id) => {
    if (!window.confirm("Delete this shift?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/shifts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadShifts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    loadShifts();
  }, []);

  return (
    <div className="table-wrapper">
      {shifts.length === 0 ? (
        <div className="empty-state">No shifts available yet.</div>
      ) : (
        <table className="shift-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Code</th>
              <th>Department</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift._id}>
                <td>{shift.employeeName}</td>
                <td>{shift.employeeCode}</td>
                <td>{shift.department}</td>
                <td>{shift.date}</td>
                <td>{shift.startTime}</td>
                <td>{shift.endTime}</td>
                {role === "admin" && (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteShift(shift._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShiftTable;
