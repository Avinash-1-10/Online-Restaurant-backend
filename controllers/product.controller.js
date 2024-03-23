import Product from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Retrieve all products
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Return the products in the response
    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

// Retrieve a single product by ID
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(new ApiResponse(400, null, "ID not found"));
    }
    // Find the product by ID and populate the 'owner' field
    const product = await Product.findById(id).populate({
      path: "owner",
      select: "-password -createdAt -updatedAt -__v",
    });
    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Product not found"));
    }
    // Return the product in the response
    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product fetched successfully"));
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, image, owner } = req.body;
    if (!name || !price || !image || !owner) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "Name, price, image, and user are required"
          )
        );
    }
    // Create a new product instance
    const product = new Product({ name, price, image, owner });
    // Save the product to the database
    await product.save();
    // Return the newly created product in the response
    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product created successfully"));
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

// Update an existing product by ID
const updateProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(new ApiResponse(400, null, "ID not found"));
    }
    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Product not found"));
    }
    // Update the product fields if provided
    if (name) product.name = name;
    if (price) product.price = price;
    if (image) product.image = image;
    // Save the updated product to the database
    await product.save();
    // Return the updated product in the response
    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product updated successfully"));
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(new ApiResponse(400, null, "ID not found"));
    }
    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Product not found"));
    }
    // Delete the product from the database
    await Product.findByIdAndDelete(id);
    // Return a success message in the response
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Product deleted successfully"));
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
