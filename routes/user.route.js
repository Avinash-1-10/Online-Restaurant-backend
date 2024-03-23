import express from "express";
import { getUsers, login, register } from "../controllers/user.controller.js";

const userRouter = express.Router();

// Route to register a new user
userRouter.post("/register", register);

// Route to login a user
userRouter.post("/login", login);

// Route to get all users
userRouter.get("/", getUsers);

export default userRouter;
