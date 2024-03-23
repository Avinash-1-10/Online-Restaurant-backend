import mongoose from "mongoose";

// Define the schema for the product model
const productSchema = new mongoose.Schema(
  {
    // Name of the product
    name: {
      type: String,
      required: true,
    },
    // Price of the product
    price: {
      type: Number,
      required: true,
    },
    // Image URL of the product
    image: {
      type: String,
      required: true,
    },
    // Reference to the user who owns the product
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Create the Product model from the schema
const Product = mongoose.model("Product", productSchema);

// Export the Product model
export default Product;
