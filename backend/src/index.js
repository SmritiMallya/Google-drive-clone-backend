import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Import configuration
import { PORT, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } from "./config.js"; // Ensure the path is correct

// Import routes
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // Fixed import path

// Import middleware
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { logger } from "./utils/logger.js"; // Assuming you want to use your logger

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Basic logging middleware (optional, using your logger)
app.use((req, res, next) => {
  logger(`${req.method} ${req.url}`, "info");
  next();
});

// Routes
app.use("/api/auth", authRoutes); // Mount authentication routes under /api/auth
app.use("/api/files", fileRoutes); // Mount file routes under /api/files
app.use("/api/users", userRoutes); // Mount user routes under /api/users

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Google Drive Clone Backend is running!" });
});

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Supabase URL: ${process.env.SUPABASE_URL ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log(`Supabase Bucket: ${process.env.SUPABASE_BUCKET ? 'Configured' : 'NOT CONFIGURED'}`);
});
