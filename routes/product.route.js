import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

// Route to get all products
productRouter.get("/", getAllProducts);

// Route to get a single product by ID
productRouter.get("/:id", getSingleProduct);

// Route to create a new product
productRouter.post("/", createProduct);

// Route to update an existing product by ID
productRouter.put("/:id", updateProduct);

// Route to delete a product by ID
productRouter.delete("/:id", deleteProduct);

export default productRouter;
