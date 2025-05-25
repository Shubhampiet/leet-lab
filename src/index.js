import express, { urlencoded } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.routes.js";

dotenv.config();

const app = express();

app.use(cookieparser());
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("Welcome in Leet Lab");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problem", problemRoutes)
app.use("/api/v1/execute-code", executionRoute)

app.listen(port, () => {
  console.log("App is listening on port", port);
});
