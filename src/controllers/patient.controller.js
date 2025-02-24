import { patientModel } from "../models/patient.schema.js";
import { reportModel } from "../models/report.schema.js";

/**
 * Controller function to register a new patient.
 * It checks if the patient is already registered using their unique number.
 * If the patient exists, it returns the existing patient data.
 * Otherwise, it creates a new patient record.
 */
export const patientRegister = async (req, res) => {
    // Extract the patient's number and name from the request body
    const { number, name } = req.body;
    try {
        // Find an existing patient with the given number
        let user = await patientModel.findOne({ number });

        // If a patient is found, send a response that the patient is already registered
        if (user) {
            return res.status(200).send({
                message: 'Patient already registered',
                patientInfo: user
            });
        }
        // If the patient is not found, create a new patient record
        const newUser = await patientModel.create({ number, name });
        return res.status(201).send({
            message: 'Patient registered successfully',
            patientInfo: newUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

// Controller function to create a report for a patient.
export const createReport = async (req, res) => {
    const { id } = req.params; // Extract patient ID from request parameters
    const { status } = req.body; // Extract report status from request body
    try {

        const patient = await patientModel.findById(id); // Find patient by ID

        // If patient does not exist, send error response
        if (!patient) {
            return res.status(422).send({ message: "Patient does not exist" });
        }

        // Create a new report for the patient
        let report = await reportModel.create({
            createdByDoctor: req.user.id,
            patient: id,
            status,
            date: new Date()
        });

        // Add the report to the patient's reports array and save the patient
        patient.reports.push(report);
        patient.save();

        // Send success response with report data
        return res.status(201).send({
            message: 'Report created successfully',
            data: report
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

// Controller function to get all the reports of a patient
export const patientReports = async (req, res) => {
    const { id } = req.params; // Extract patient ID from request parameters
    try {
        const patient = await patientModel.findById(id); // Find patient by ID

        // If patient does not exist, send error response
        if (!patient) {
            return res.status(422).send({ message: "Patient does not exist" });
        }
        // Find all reports for the patient, populate the doctor information, and sort by date
        const reports = await reportModel.find({ patient: id }).populate('createdByDoctor').sort('date');

        // Format the report data to include only required fields
        const reportData = reports.map(report => {
            const originalDate = report.date;
            const dateObj = new Date(originalDate);

            const formattedDate = dateObj.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });

            return {
                createdByDoctor: report.createdByDoctor.name,
                status: report.status,
                date: formattedDate
            };
        });
        // Send success response with formatted report data
        return res.status(200).send({
            message: `List of all the reports of patient with id - ${id}`,
            reports: reportData
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}
