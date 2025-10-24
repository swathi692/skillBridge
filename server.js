// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Route imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import exchangeRoutes from "./routes/exchanges.js";
import messageRoutes from "./routes/messages.js";
import ratingRoutes from "./routes/ratings.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit process on DB connection failure
  }
};
connectDB();

// API Routes
app.use("/api/auth", authRoutes);        // Signup / Login
app.use("/api/users", userRoutes);       // Get / Update Users
app.use("/api/exchanges", exchangeRoutes); // Add / Get Exchanges
app.use("/api/messages", messageRoutes);   // Add / Get Messages
app.use("/api/ratings", ratingRoutes);     // Add / Get Ratings
app.use("/admin", adminRoutes);            // Admin-specific routes

// Root Route
app.get("/", (req, res) => {
  res.send("SkillBridge Backend is running 🚀");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
