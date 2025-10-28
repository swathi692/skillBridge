import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  rater: { type: String, required: true },
  ratee: { type: String, required: true },
  score: { type: Number, required: true },
  review: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);
export default Rating;
