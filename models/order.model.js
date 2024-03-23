import mongoose from "mongoose";

// Define the schema for the order model
const orderSchema = new mongoose.Schema(
  {
    // Reference to the user who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Reference to the product being ordered
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    // Quantity of the product being ordered
    quantity: {
      type: Number,
      required: true,
    },
    // Total price of the order
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Create the Order model from the schema
const Order = mongoose.model("Order", orderSchema);

// Export the Order model
export default Order;
