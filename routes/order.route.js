import express from "express";
import {
  createOrder,
  getOrders,
  getSingleOrder,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

// Get all orders
orderRouter.get("/", getOrders);

// Get order by ID
orderRouter.get("/:id", getSingleOrder);

// Place a new order
orderRouter.post("/", createOrder);

export default orderRouter;
