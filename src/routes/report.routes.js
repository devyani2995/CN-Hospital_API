import express from "express";
import passport from "passport";
import { filteredReports } from "../controllers/report.controller.js";

// Create a router instance for handling report related routes
const reportRouter = express.Router();

// Route to get the list of all the reports of all the patients filtered by a specific status
reportRouter.get('/:status',passport.authenticate('jwt',{session:false}),filteredReports);

export default reportRouter;