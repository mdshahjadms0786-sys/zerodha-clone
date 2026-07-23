import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Summary = () => {
  const { user } = useAuth();
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("dash_token");
    axios
      .get("http://localhost:3002/allHoldings", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => setAllHoldings(res.data))
      .catch((err) => console.error("Failed to fetch holdings:", err));
  }, []);

  const totalInvestment = allHoldings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const currentValue = allHoldings.reduce((sum, s) => sum + s.price * s.qty, 0);
  const totalPnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? ((totalPnl / totalInvestment) * 100).toFixed(2) : "0.00";
  const pnlClass = totalPnl >= 0 ? "profit" : "loss";

  const fmt = (num) => {
    if (Math.abs(num) >= 1000) return (num / 1000).toFixed(2) + "k";
    return num.toFixed(2);
  };

  return (
    <>
      <div className="username">
        <h6>Hi, {user?.name || "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{fmt(currentValue || 3740)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance <span>{fmt(currentValue || 3740)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnlClass}>
              {fmt(Math.abs(totalPnl))} <small>{totalPnl >= 0 ? "+" : ""}{pnlPercent}%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{fmt(currentValue)}</span>
            </p>
            <p>
              Investment <span>{fmt(totalInvestment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
