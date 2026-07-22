import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Signup() {
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    setLoading(true);
    try {
      const data = await signup(formData.name, formData.email, formData.phone, formData.password);
      window.location.href = `http://localhost:3001?token=${data.token}`;
    } catch (err) {
      const backendMsg = err.response?.data?.details;
      const mainMsg = err.response?.data?.error || "Signup failed. Please try again.";
      setError(backendMsg ? `${mainMsg}: ${backendMsg}` : mainMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="text-center py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h1 className="fs-1 fw-bold">Open a free demat and trading account online</h1>
          <p className="text-muted fs-5">
            Start investing brokerage free and join a community of <strong>1.6+ crore</strong> investors and traders
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img src="media/images/account_open.svg" alt="account opening" className="img-fluid" style={{ maxHeight: "400px" }} />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold mb-1">Create your account</h3>
            <p className="text-muted mb-3">Already have an account? <Link to="/login" className="text-primary">Log in</Link></p>
            <div className="border rounded p-4" style={{ maxWidth: "450px" }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Full name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Mobile number</label>
                  <div className="d-flex align-items-center border rounded px-3 py-1">
                    <img src="media/images/india-flag.svg" alt="India" style={{ height: "20px", marginRight: "8px" }} />
                    <span className="me-2 text-muted">+91</span>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control border-0 p-0"
                      placeholder="Enter your mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ outline: "none", boxShadow: "none" }}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Create a password (min 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Confirm password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                      Creating account...
                    </span>
                  ) : (
                    "Create account"
                  )}
                </button>

                <p className="text-muted small mb-0 text-center">
                  By proceeding, you agree to the Zerodha terms & privacy policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-4" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h4 className="fw-bold">Already have a demat account?</h4>
          <p className="text-muted">
            Move your holdings to Zerodha and we'll cover your transfer costs, up to ₹500,
            <span className="text-decoration-none" style={{cursor:"default"}}> learn more</span>.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">Investment options with Zerodha demat account</h2>
        <div className="row text-center g-4">
          <div className="col-md-3">
            <div className="p-4">
              <img src="media/images/stocks-acop.svg" alt="Stocks" style={{ height: "60px" }} className="mb-3" />
              <h5 className="fw-bold">Stocks</h5>
              <p className="text-muted small">Invest in all exchange-listed securities</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4">
              <img src="media/images/mf-acop.svg" alt="Mutual Funds" style={{ height: "60px" }} className="mb-3" />
              <h5 className="fw-bold">Mutual funds</h5>
              <p className="text-muted small">Invest in commission-free direct mutual funds</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4">
              <img src="media/images/ipo-acop.svg" alt="IPO" style={{ height: "60px" }} className="mb-3" />
              <h5 className="fw-bold">IPO</h5>
              <p className="text-muted small">Apply to the latest IPOs instantly via UPI</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4">
              <img src="media/images/fo-acop.svg" alt="F&O" style={{ height: "60px" }} className="mb-3" />
              <h5 className="fw-bold">Futures & options</h5>
              <p className="text-muted small">Hedge and mitigate market risk through simplified F&O trading</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <span className="btn btn-outline-primary px-4 py-2" style={{cursor:"default"}}>Explore Investments</span>
        </div>
      </div>

      <div className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Steps to open a demat account with Zerodha</h2>
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <img src="media/images/steps-acop.svg" alt="Steps" className="img-fluid" style={{ maxHeight: "350px" }} />
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px", minWidth: "50px", fontSize: "20px", fontWeight: "bold" }}>01</div>
                <p className="mb-0 fs-5">Enter the requested details</p>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px", minWidth: "50px", fontSize: "20px", fontWeight: "bold" }}>02</div>
                <p className="mb-0 fs-5">Complete e-sign & verification</p>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px", minWidth: "50px", fontSize: "20px", fontWeight: "bold" }}>03</div>
                <p className="mb-0 fs-5">Start investing!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img src="media/images/acop-benefits.svg" alt="Benefits" className="img-fluid" style={{ maxHeight: "300px" }} />
            <h2 className="fw-bold mt-3">Benefits of opening a Zerodha demat account</h2>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <h4 className="fw-bold">Unbeatable pricing</h4>
              <p className="text-muted">Zero charges for equity & mutual fund investments. Flat ₹20 fees for intraday and F&O trades.</p>
            </div>
            <div className="mb-4">
              <h4 className="fw-bold">Best investing experience</h4>
              <p className="text-muted">Simple and intuitive trading platform with an easy-to-understand user interface.</p>
            </div>
            <div className="mb-4">
              <h4 className="fw-bold">No spam or gimmicks</h4>
              <p className="text-muted">Committed to transparency — no gimmicks, spam, "gamification", or intrusive push notifications.</p>
            </div>
            <div className="mb-4">
              <h4 className="fw-bold">The Zerodha universe</h4>
              <p className="text-muted">More than just an app — gain free access to the entire ecosystem of our partner products.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Explore different account types</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center p-4 border rounded bg-white" style={{ minHeight: "220px" }}>
                <img src="media/images/acop-individual.svg" alt="Individual" style={{ height: "50px" }} className="mb-3" />
                <h5 className="fw-bold">Individual Account</h5>
                <p className="text-muted small">Invest in equity, mutual funds and derivatives</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4 border rounded bg-white" style={{ minHeight: "220px" }}>
                <img src="media/images/acop-huf.svg" alt="HUF" style={{ height: "50px" }} className="mb-3" />
                <h5 className="fw-bold">HUF Account</h5>
                <p className="text-muted small">Make tax-efficient investments for your family</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4 border rounded bg-white" style={{ minHeight: "220px" }}>
                <img src="media/images/acop-nri.svg" alt="NRI" style={{ height: "50px" }} className="mb-3" />
                <h5 className="fw-bold">NRI Account</h5>
                <p className="text-muted small">Invest in equity, mutual funds, debentures, and more</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4 border rounded bg-white" style={{ minHeight: "220px" }}>
                <img src="media/images/acop-minor.svg" alt="Minor" style={{ height: "50px" }} className="mb-3" />
                <h5 className="fw-bold">Minor Account</h5>
                <p className="text-muted small">Teach your little ones about money & invest for their future</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4 border rounded bg-white" style={{ minHeight: "220px" }}>
                <img src="media/images/acop-corporate.svg" alt="Corporate" style={{ height: "50px" }} className="mb-3" />
                <h5 className="fw-bold">Corporate / LLP / Partnership</h5>
                <p className="text-muted small">Manage your business surplus and investments easily</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-5">
        <div className="container">
          <h2 className="fw-bold mb-3">Open a Zerodha account</h2>
          <p className="text-muted mb-4">Simple and intuitive apps · ₹0 for investments · ₹20 for intraday and F&O trades.</p>
          <Link to="/signup" className="btn btn-primary px-5 py-3 fs-5">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
