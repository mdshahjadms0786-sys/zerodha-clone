require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { authMiddleware, JWT_SECRET } = require("./middleware/auth");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(express.json());

let dbReady = false;
let useMongo = false;

async function initDB() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");

    const { HoldingsModel } = require("./model/HoldingsModel");
    const { PositionsModel } = require("./model/PositionsModel");
    const { OrdersModel } = require("./model/OrdersModel");
    const { UserModel } = require("./model/UserModel");

    useMongo = true;
    dbReady = true;

    // Auth routes (MongoDB version)
    app.post("/api/auth/signup", async (req, res) => {
      try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
          return res.status(400).json({ error: "All fields are required" });
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ error: "An account with this email already exists" });
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({ name, email, phone, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({
          message: "Account created successfully!",
          token,
          user: { id: newUser._id, name: newUser.name, email: newUser.email, phone: newUser.phone },
        });
      } catch (error) {
        if (error.code === 11000) return res.status(409).json({ error: "Email already exists" });
        console.error("Signup error:", error);
        res.status(500).json({ error: "Signup failed", details: error.message });
      }
    });

    app.post("/api/auth/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password are required" });
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid email or password" });
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: "Invalid email or password" });
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({
          message: "Login successful!",
          token,
          user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
        });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed", details: error.message });
      }
    });

    app.get("/api/auth/profile", authMiddleware, async (req, res) => {
      try {
        const user = await UserModel.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ user });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile", details: error.message });
      }
    });

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
          name: req.body.name, qty: req.body.qty, price: req.body.price, mode: req.body.mode,
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

    app.listen(PORT, () => {
      console.log("App started on port", PORT);
    });
  } catch (error) {
    console.error("MongoDB unavailable:", error.message);
    console.log("Using local file-based storage (MongoDB Atlas not reachable).");
    startFileBasedServer();
  }
}

function startFileBasedServer() {
  dbReady = true;
  const fs = require("fs");
  const path = require("path");
  const DATA_FILE = path.join(__dirname, "data.json");

  let users = [];
  let holdings = [];
  let positions = [];
  let orders = [];

  if (fs.existsSync(DATA_FILE)) {
    try {
      const saved = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
      users = saved.users || [];
      holdings = saved.holdings || [];
      positions = saved.positions || [];
      orders = saved.orders || [];
    } catch (e) { /* ignore */ }
  }

  function saveData() {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ users, holdings, positions, orders }, null, 2));
  }

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
      if (users.find(u => u.email === email)) {
        return res.status(409).json({ error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        id: Date.now().toString(),
        name, email, phone,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      saveData();
      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "7d" });
      res.status(201).json({
        message: "Account created successfully!",
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone },
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Signup failed", details: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: "Email and password are required" });
      const user = users.find(u => u.email === email);
      if (!user) return res.status(401).json({ error: "Invalid email or password" });
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ error: "Invalid email or password" });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      res.json({
        message: "Login successful!",
        token,
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed", details: error.message });
    }
  });

  app.get("/api/auth/profile", authMiddleware, async (req, res) => {
    try {
      const user = users.find(u => u.id === req.userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      const { password, ...userData } = user;
      res.json({ user: userData });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile", details: error.message });
    }
  });

  app.get("/allHoldings", (req, res) => {
    res.json(holdings);
  });

  app.get("/allPositions", (req, res) => {
    res.json(positions);
  });

  app.post("/newOrder", (req, res) => {
    const order = {
      id: Date.now().toString(),
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    saveData();
    res.json({ message: "Order placed!", order });
  });

  app.get("/allOrders", (req, res) => {
    res.json(orders.reverse());
  });

  app.post("/api/seedData", (req, res) => {
    holdings.length = 0;
    positions.length = 0;
    orders.length = 0;
    const sampleHoldings = [
      { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
      { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
      { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
      { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
      { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
      { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
      { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
      { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
      { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
      { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
      { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
    ];
    const samplePositions = [
      { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
      { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
    ];
    holdings.push(...sampleHoldings);
    positions.push(...samplePositions);
    saveData();
    res.json({ message: "Sample data loaded!", holdings: holdings.length, positions: positions.length });
  });

  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });

  app.listen(PORT, () => {
    console.log(`File-based server started on port ${PORT}`);
    console.log("Note: Using local storage instead of MongoDB.");
  });
}

initDB();
