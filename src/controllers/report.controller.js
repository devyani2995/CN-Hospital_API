import { reportModel } from "../models/report.schema.js";

// Controller function list all the reports of all the patients filtered by a specific status
export const filteredReports = async (req, res) => {
  
    const {status} = req.params; // Extract status from request parameters
    try {
        const reports = await reportModel.find({status}); // Find all reports with the given status
        // Send success response with the list of reports
        return res.status(200).json({
            message: `List of all the reports with status ${status}`,
            reports: reports
        });
    } 
    catch (error) {
        // Handle server errors
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}