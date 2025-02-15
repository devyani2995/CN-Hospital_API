import mongoose from "mongoose";
// Define the schema for the Report collection in MongoDB
const reportSchema = new mongoose.Schema({
    // Reference to the doctor who created the report
    createdByDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    // Reference to the patient for whom the report is created
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },
    // Status of the patient
    status: {
        type: String,
        require: true,
        enum: [
            'Negative',
            'Travelled-Quarantine',
            'Symptoms-Quarantine',
            'Positive-Admit'
        ]
    },
    // Date when the report was created
    date: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});

// Mongoose model for the Report collection in MongoDB
export const reportModel = new mongoose.model('Report', reportSchema);
