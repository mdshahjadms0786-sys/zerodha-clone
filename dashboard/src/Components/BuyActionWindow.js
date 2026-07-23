import React, { useState, useContext } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [mode, setMode] = useState("BUY");
  const [loading, setLoading] = useState(false);
  const generalContext = useContext(GeneralContext);

  const handleOrderClick = () => {
    setLoading(true);
    const token = localStorage.getItem("dash_token");
    axios
      .post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: parseInt(stockQuantity, 10),
          price: parseFloat(stockPrice),
          mode,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      )
      .then(() => {
        generalContext.closeBuyWindow();
        generalContext.showToast(
          `${mode === "BUY" ? "Bought" : "Sold"} ${stockQuantity} shares of ${uid}`,
          "success"
        );
      })
      .catch((error) => {
        generalContext.showToast("Failed to place order", "error");
        console.error("Failed to save order:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="mode-toggle">
          <button
            className={mode === "BUY" ? "btn btn-blue active" : "btn btn-grey"}
            onClick={() => setMode("BUY")}
          >
            Buy
          </button>
          <button
            className={mode === "SELL" ? "btn btn-red active" : "btn btn-grey"}
            onClick={() => setMode("SELL")}
          >
            Sell
          </button>
        </div>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockPrice * stockQuantity * 0.2).toFixed(2)}</span>
        <div>
          <button
            className={`btn ${mode === "BUY" ? "btn-blue" : "btn-red"}`}
            onClick={handleOrderClick}
            disabled={loading}
          >
            {loading ? "Placing..." : mode === "BUY" ? "Buy" : "Sell"}
          </button>
          <button className="btn btn-grey" onClick={generalContext.closeBuyWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
