import mongoose from "mongoose";

// Define the schema for the user model
const userSchema = new mongoose.Schema(
  {
    // Name of the user
    name: {
      type: String,
      required: true,
    },
    // Email of the user
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email uniqueness
    },
    // Password of the user
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
