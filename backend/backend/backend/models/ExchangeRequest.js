// models/ExchangeRequest.js
import mongoose from "mongoose";

const exchangeSchema = new mongoose.Schema({
  title: String,
  fromUser: String,
  toUser: String,
  skillOffered: String,
  skillWanted: String,
  status: { type: String, default: "Pending" },
});

export default mongoose.model("ExchangeRequest", exchangeSchema);
