import express from "express";
import {
  check,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = express();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.post("/check", authMiddleware, check);

export default authRoutes;
