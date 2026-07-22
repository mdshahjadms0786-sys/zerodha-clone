import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Login() {
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
      const data = await login(email, password);
      window.location.href = `http://localhost:3001?token=${data.token}`;
    } catch (err) {
      const backendMsg = err.response?.data?.details;
      const mainMsg = err.response?.data?.error || "Login failed. Please try again.";
      setError(backendMsg ? `${mainMsg}: ${backendMsg}` : mainMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="text-center py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h1 className="fs-1 fw-bold">Log in to your Zerodha account</h1>
          <p className="text-muted fs-5">
            Access your portfolio, place trades, and manage your investments
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="border rounded p-4">
              <h3 className="fw-bold mb-1 text-center">Welcome back</h3>
              <p className="text-muted mb-4 text-center">
                Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label className="form-label small fw-semibold">Password</label>
                    <span className="small text-muted" style={{ cursor: "default" }}>Forgot password?</span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger py-2 small">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fs-5 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </span>
                  ) : (
                    "Log in"
                  )}
                </button>

                <div className="text-center">
                  <span
                    className="btn btn-outline-secondary w-100 py-2"
                    style={{ cursor: "default" }}
                  >
                    Continue with Google
                  </span>
                </div>
              </form>
            </div>

            <div className="text-center mt-4">
              <p className="text-muted small">
                By logging in, you agree to our terms and privacy policy
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container text-center">
          <h4 className="fw-bold">Trouble logging in?</h4>
          <p className="text-muted">
            Get help with your account{" "}
            <span style={{ cursor: "default", textDecoration: "underline" }}>here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
