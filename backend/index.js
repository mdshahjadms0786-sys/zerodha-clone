require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch holdings", details: error.message });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch positions", details: error.message });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.send("Order saved!");
  } catch (error) {
    res.status(500).json({ error: "Failed to save order", details: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

async function startServer() {
  try {
    await mongoose.connect(uri);
    console.log("DB started!");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log("App started on port", PORT);
  });
}

startServer();