import { pollBatchResults, submitBatch } from "../libs/judge0.libs.js";

export const executeCode = async (req, res) => {
  try {
    const { source_code, language_id, stdin, expected_outputs, problemId } =
      req.body;
    const userId = req.user.id;

    //validate test cases

    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({
        error: "Invalid or missing test cases",
      });
    }

    //Prepare each test case for Judge0 batch submission

    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    // Send batch of submissons to Judge0

    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map((res) => res.token);

    // Poll Judge0 for results of all submitted test cases
    const results = await pollBatchResults(tokens);
    console.log("results---->>>", results);

    res.status(200).json({
      message: "Code executed successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error in code exucution",
      error,
    });
  }
};
