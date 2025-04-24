import express from "express";
import { check, login, logout, register } from "../controllers/user.controller";

const userRouter = express();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/check", check);