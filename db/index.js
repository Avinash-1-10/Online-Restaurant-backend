import mongoose from "mongoose";

// Function to establish connection with the MongoDB database.
const dbConnection = async () => {
  const MONGO_URI =
    process.env.MONGO_URI || "mongodb://localhost:27017/restaurent";
  try {
    // Connect to the MongoDB database
    await mongoose.connect(MONGO_URI);

    // Log a success message if the connection is successful
    console.log("Database connected");
  } catch (error) {
    // Log any errors that occur during the connection process
    console.error("Error connecting to the database:", error.message);
    // Throw the error to propagate it to the calling function
    throw error;
  }
};

export default dbConnection;
