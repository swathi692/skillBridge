import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // fetch all users
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching users" });
  }
});

// Update user profile
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, skills } = req.body;

  if (!name || !skills) {
    return res.status(400).json({ error: "Name and skills are required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, skills },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "✅ Profile updated successfully!",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error updating profile" });
  }
});

export default router;
