import express from "express";
import User from "../models/User.js";
import ExchangeRequest from "../models/ExchangeRequest.js";
import Message from "../models/Message.js";
import Rating from "../models/Rating.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    const exchanges = await ExchangeRequest.find();
    const messages = await Message.find();
    const ratings = await Rating.find();

    res.json({ users, exchanges, messages, ratings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch all data" });
  }
});

export default router;
