import mongoose from "mongoose";

// Define the schema for the Doctor collection in MongoDB
const doctorSchema = new mongoose.Schema({
    // Username for the doctor, must be unique
    username: {
        type: String,
        required: true,
        unique: true
    },
    // Password for authentication
    password: {
        type: String,
        required: true,
    },
     // Full name of the doctor
    name: {
        type: String,
        required: true,
    },
     // Array of report references linked to doctor
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reports',
        }
    ]
}, {
    // Automatically add createdAt and updatedAt attributes
    timestamps: true
});

// Mongoose model for the Doctor collection in MongoDB
export const doctorModel = new mongoose.model('Doctor', doctorSchema);