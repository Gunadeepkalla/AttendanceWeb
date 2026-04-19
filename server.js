import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authroutes.js";
import adminRoutes from "./src/routes/adminroutes.js";
import attendanceRoutes from "./src/routes/attendanceRoutes.js";
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/attendance", attendanceRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});