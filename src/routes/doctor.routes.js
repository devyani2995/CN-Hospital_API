import express from "express";
import { doctorLogin, doctorRegister } from "../controllers/doctor.controller.js";

// Create a router instance for handling doctor related routes
const doctorRouter = express.Router();

// Route to handle doctor registration
doctorRouter.post('/register', doctorRegister);
// Route to handle doctor login
doctorRouter.post('/login',doctorLogin);

export default doctorRouter;
