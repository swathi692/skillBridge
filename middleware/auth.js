import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ name, email });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
