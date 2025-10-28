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
import User from "./models/user.js";

dotenv.config();

const app = express();

// ✅ Allowed frontend origins (add your deployed frontend + backend URLs)
const allowedOrigins = [
  "http://localhost:3000",
  "https://skillbridge-6c0zfh8i2-swathis-projects-cf279158.vercel.app", // your Vercel frontend
  "https://skillbridge-lviu.onrender.com" // your Render backend (if used for API calls)
];

// ✅ CORS Middleware (must be before routes)
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request Origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json());

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};
connectDB();

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exchanges", exchangeRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/admin", adminRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("SkillBridge Backend is running 🚀");
});

// ✅ Test Database Route
app.get("/test-db", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      message: "Database connected ✅",
      totalUsers: users.length,
      users,
    });
  } catch (err) {
    console.error("Database fetch error:", err);
    res.status(500).json({ error: "Database not reachable ❌" });
  }
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
