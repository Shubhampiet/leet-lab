import { db } from "../libs/db.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - token is missing",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Error authenticating user" });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if(!user || user.role !== "ADMIN"){
      res.status(400).json({
        message:"access denied, admins only"
      })
    }
    next()
  } catch (error) {
    console.log("error",error)
    res.status(500).json({
      error:"Error in role checking"
    })
  }
};
