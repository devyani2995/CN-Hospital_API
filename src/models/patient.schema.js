import mongoose from "mongoose";

// Define the schema for the Patient collection in MongoDB
const patientSchema = new mongoose.Schema({
    // Patient's contact number
    number: {
        type: String,
        maxlength: 10,
        unique: true,
        required: true
    },
    // Full name of the patient
    name: {
        type: String,
        required: true,
    },
    // Array of report references linked to patient
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId, // Stores ObjectId references from the Reports collection
            ref: 'Reports', // Establishes relationship with the Reports model
        }
    ]
}, {
    timestamps: true
});

// Mongoose model for the Patient collection in MongoDB
export const patientModel = new mongoose.model('Patient', patientSchema);