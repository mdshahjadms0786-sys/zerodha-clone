import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Apps from "./App";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import GeneralContext from "./GeneralContext";

const SeedButton = () => {
  const generalContext = useContext(GeneralContext);

  const handleSeed = () => {
    const token = localStorage.getItem("dash_token");
    axios
      .post("http://localhost:3002/api/seedData", {}, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => {
        generalContext.showToast(res.data.message, "success");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(() => generalContext.showToast("Failed to load sample data", "error"));
  };

  return (
    <button
      onClick={handleSeed}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 999,
        background: "#387ed1",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        fontSize: "20px",
        cursor: "pointer",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
      title="Load sample data"
    >
      ⚡
    </button>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
        <SeedButton />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;