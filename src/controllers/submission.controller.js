import {db} from "../libs/db.js"

export const getAllSubmissions = async (req, res) => {
    try {
        const userId=req.user.id
        
        const submissions=await db.submission.findMany({
            where:{
                userId:userId
            }
        })

        res.status(200).json({
            success:true,
            message:"All the submissions has been fetched",
            submissions,
        })
    } catch (error) {
        console.log("getAllSubmissions error", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
};

export const getSubmissionForProblem = async (req, res) => { };

export const getAllTheSubmissionsForProblem = async (req, res) => { };
