import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Retrieve all orders
const getOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();
    // Return a successful response with the orders
    return res
      .status(200)
      .json(new ApiResponse(200, orders, "Orders fetched successfully"));
  } catch (error) {
    // Return an error response if fetching orders fails
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

// Retrieve a single order by ID
const getSingleOrder = async (req, res) => {
  try {
    // Extract the order ID from the request parameters
    const { id } = req.params;
    // Find the order by its ID and populate associated user and product details
    const order = await Order.findById(id)
      .populate({
        path: "user",
        select: "-password -createdAt -updatedAt -__v",
      })
      .populate({
        path: "product",
        select: "-createdAt -updatedAt -__v",
      });
    // Return a successful response with the fetched order
    if (!order) {
      // If no order found, return a not found response
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Order not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, order, "Order fetched successfully"));
  } catch (error) {
    // Return an error response if fetching the order fails
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    // Extract necessary details from the request body
    const { user, product, quantity } = req.body;
    // Check if all required fields are provided
    if (!user || !product || !quantity) {
      // If any field is missing, return a bad request response
      return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }
    // Check if the specified product exists
    const placedProduct = await Product.findById(product);
    if (!placedProduct) {
      // If the product does not exist, return a bad request response
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Product not found"));
    }
    // Calculate the total price of the order
    const totalPrice = +placedProduct.price * +quantity;
    // Create a new order with the provided details
    const order = new Order({ user, product, quantity, totalPrice });
    // Save the new order to the database
    await order.save();
    // Return a successful response with the created order
    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order created successfully"));
  } catch (error) {
    // Return an error response if creating the order fails
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export { getOrders, getSingleOrder, createOrder };
