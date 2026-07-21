import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 text-center border-top">
        <div className="col-8 p-4">
          <a href="https://zerodha.com/brokerage-calculator/" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">Brokerage calculator</h3>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5", fontSize: "12px" }}
            className="text-mut"
          >
            <li>
              Call & Trade and RMS auto-squareoff:Additional charges of ₹50 +
              GST per order.
            </li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contract note. Courier charges apply.
            </li>
            <li>
              For NRI account (non-PIS), 0.5% or ₹100 per executed order for
              equity (whichever is lower).
            </li>
            <li>
              For NRI account (PIS), 0.5% or ₹200 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </li>
          </ul>
        </div>
        <div className="col-4 p-4">
          <a href="https://zerodha.com/charges/" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">List of charges</h3>
          </a>
          <table className="table table-bordered table-sm mt-3" style={{ fontSize: "11px" }}>
            <thead>
              <tr>
                <th>Segment</th>
                <th>Brokerage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Equity Delivery</td>
                <td>Zero brokerage</td>
              </tr>
              <tr>
                <td>Equity Intraday</td>
                <td>0.03% or ₹20/executed order (whichever is lower)</td>
              </tr>
              <tr>
                <td>F&O - Futures</td>
                <td>0.03% or ₹20/executed order (whichever is lower)</td>
              </tr>
              <tr>
                <td>F&O - Options</td>
                <td>Flat ₹20 per executed order</td>
              </tr>
              <tr>
                <td>Currency Futures</td>
                <td>0.03% or ₹20/executed order (whichever is lower)</td>
              </tr>
              <tr>
                <td>Currency Options</td>
                <td>Flat ₹20 per executed order</td>
              </tr>
              <tr>
                <td>Commodity Futures</td>
                <td>0.03% or ₹20/executed order (whichever is lower)</td>
              </tr>
              <tr>
                <td>Commodity Options</td>
                <td>Flat ₹20 per executed order</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;