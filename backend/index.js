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
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    saveData();
    res.send("Order saved!");
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
