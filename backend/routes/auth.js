import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Signup (password-less)
router.post("/signup", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        skills: [],
        points: 0,
        rating: 0,
      });
      await user.save();
    }

    return res.json(user); // send user object to frontend
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login (password-less)
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user); // send user object to frontend
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
