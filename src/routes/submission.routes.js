import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getAllProblems } from "../controllers/problem.controller";
import {
  getAllSubmissions,
  getAllTheSubmissionsForProblem,
  getSubmissionForProblem,
} from "../controllers/submission.controller";

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions", authMiddleware, getAllSubmissions);

submissionRoutes.get(
  "/get-submission/:problemId",
  authMiddleware,
  getSubmissionForProblem
);

submissionRoutes.get(
  "/get-submissions-count/:problemId",
  authMiddleware,
  getAllTheSubmissionsForProblem
);

export default submissionRoutes;
