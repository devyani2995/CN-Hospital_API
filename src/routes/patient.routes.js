import express from "express";
import passport from "passport";
import { createReport, patientRegister, patientReports } from "../controllers/patient.controller.js";

// Create a router instance for handling patient related routes
const patientRouter = express.Router();

// Route to handle patient registration, protected by JWT authentication
patientRouter.post('/register', passport.authenticate('jwt',{session:false}),patientRegister);
// Route for creating a report for a patient, protected by JWT authentication
patientRouter.post('/:id/create_report', passport.authenticate('jwt',{session:false}),createReport);
// Route to get all the reports of a patient, protected by JWT authentication
patientRouter.get('/:id/all_reports',passport.authenticate('jwt',{session:false}),patientReports)

export default patientRouter;