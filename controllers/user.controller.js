import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Registers a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "User already exists"));
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, null, `Failed to register user: ${error.message}`)
      );
  }
};

// Logs in a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Email and password are required"));
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Incorrect password"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User logged in successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, `Failed to login: ${error.message}`));
  }
};

// Retrieves all users
const getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Return the users in the response
    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, null, `Failed to fetch users: ${error.message}`)
      );
  }
};

export { register, login, getUsers };
