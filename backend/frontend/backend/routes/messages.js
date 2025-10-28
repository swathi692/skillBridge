import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Send a message
router.post("/send", async (req, res) => {
  const { fromUser, toUser, message } = req.body;
  if (!fromUser || !toUser || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newMessage = new Message({ fromUser, toUser, message });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
