import express from "express";
import Rating from "../models/Rating.js";

const router = express.Router();

// Get all ratings
router.get("/", async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
});

// Submit a rating
router.post("/submit", async (req, res) => {
  const { rater, ratee, score, review } = req.body;
  if (!rater || !ratee || !score) {
    return res.status(400).json({ error: "Rater, ratee, and score are required" });
  }
  try {
    const newRating = new Rating({ rater, ratee, score, review });
    await newRating.save();
    res.json(newRating);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit rating" });
  }
});

export default router;
