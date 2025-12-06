// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("hire-me@anshumat.org"); // pre-fill for demo
  const [password, setPassword] = useState("HireMe@2025!");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch (err) {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="card" style={{ width: "360px" }}>
        <h2 className="login-card-title">Welcome back 👋</h2>
        <p className="login-subtitle">
          Login with your admin credentials to manage employee shifts.
        </p>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>

        <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleLogin}>
          Login
        </button>

        {message && (
          <p style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: "14px", fontSize: "12px", color: "#777" }}>
          Demo admin: <b>hire-me@anshumat.org</b> / <b>HireMe@2025!</b>
        </p>
      </div>
    </div>
  );
}

export default Login;
