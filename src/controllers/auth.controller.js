import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  console.log("req.body", req.body);
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await db.user.findUnique({ where: { email } });
    console.log("existingUser:", existingUser);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });
    console.log("newUser", newUser);

    if (!newUser) {
      console.log("failed");
      return res.status(400).json({
        success: false,
        message: "User registration failed",
      });
    }

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("token", token);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      success: false,
      error: "Error creating user",
    });
  }
};

const login = async (req, res) => { };

const logout = async (req, res) => {

};

const check = async (req, res) => {};

export { register, login, logout, check };
