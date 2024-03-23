import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import dbConnection from "./db/index.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB database
dbConnection();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
app.use("/api/v1/user", userRouter); // User routes
app.use("/api/v1/products", productRouter); // Product routes
app.use("/api/v1/order", orderRouter); // Order routes

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
