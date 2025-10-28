import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: [String],
  points: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
