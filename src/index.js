import express, { urlencoded } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cookieparser());
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("Welcome in Leet Lab");
});

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log("App is listening on port", port);
});
