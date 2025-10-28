import express from "express";
import ExchangeRequest from "../models/ExchangeRequest.js";

const router = express.Router();

// POST: add exchange
router.post("/", async (req, res) => {
  try {
    const { title, fromUser, toUser, skillOffered, skillWanted } = req.body;
    const newExchange = await ExchangeRequest.create({ title, fromUser, toUser, skillOffered, skillWanted });
    res.status(201).json(newExchange);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: fetch all exchanges
router.get("/", async (req, res) => {
  try {
    const exchanges = await ExchangeRequest.find();
    res.status(200).json(exchanges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: update status by ID
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await ExchangeRequest.findByIdAndUpdate(
      id,
      { $set: req.body }, // update any field sent in body
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Exchange not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
