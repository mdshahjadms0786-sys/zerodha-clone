import React, { useState } from "react";
import { useAuth } from "./AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "8px",
    padding: "40px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Logo"
            style={{ width: "140px" }}
          />
          <h3 style={{ marginTop: "16px", fontWeight: 700 }}>Welcome back</h3>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Log in to your trading dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: "10px 12px" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: "10px 12px" }}
            />
          </div>

          {error && (
            <div
              style={{
                background: "#f8d7da",
                color: "#842029",
                padding: "8px 12px",
                borderRadius: "4px",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "16px",
            fontSize: "13px",
            color: "#666",
          }}
        >
          Don't have an account?{" "}
          <a
            href="http://localhost:3000/signup"
            style={{ color: "#387ed1", textDecoration: "none" }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
