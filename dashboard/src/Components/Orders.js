import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("dash_token");
    axios
      .get("http://localhost:3002/allOrders", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => setAllOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr key={order.id || index}>
                <td>{order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : "-"}</td>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price?.toFixed(2)}</td>
                <td>
                  <span className={order.mode === "BUY" ? "text-success" : "text-danger"}>
                    {order.mode}
                  </span>
                </td>
                <td>
                  <span className="text-primary">{order.status || "EXECUTED"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
