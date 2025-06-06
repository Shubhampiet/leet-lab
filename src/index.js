import express, { urlencoded } from "express";
import dotenv from "dotenv";
// import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";

dotenv.config();

const app = express();

// app.use(
//   cors({
//     origin: process.env.REACT_BASE_URL,
//     credentials: true,
//   })
// );

app.use(cookieparser());
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).json({ message: "Welcome in Leet Lab" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problem", problemRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);
app.listen(Number(port), () => {
  console.log("App is listening on port", Number(port));
});
