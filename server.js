// Importing express framework for building the server
import express from 'express';
// Function to connect to the MongoDB database
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
// Environment variables configuration
import dotenv from "dotenv";
// Import passport for user authentication
import passport from 'passport';
// Import the doctor routes to handle doctor related requests
import doctorRouter from './src/routes/doctor.routes.js';
import JWTStrategy from './src/config/passport-jwt-auth.js';
// Import patient routes to handle patient related requests
import patientRouter from './src/routes/patient.routes.js';
// Import report routes to handle report related requests
import reportRouter from './src/routes/report.routes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const server = express();

// Middleware to parse JSON requests
server.use(express.json());

// Parse form data to access on server side
server.use(express.urlencoded({ extended: true }));

// Initialize Passport for authentication
server.use(passport.initialize());  

// For all requests related to doctor,redirect to doctor routes
server.use('/api/doctors', doctorRouter);

// For all requests related to patient,redirect to patient routes
server.use('/api/patients', patientRouter);

// For all requests related to report,redirect to report routes
server.use('/api/reports', reportRouter);

// Default request handler
server.get('/', (req, res) => {
    res.send('Welcome to Hospital APIs');
});

// Start the server and listen for requests on the specified port
server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
    // Connect to the MongoDB database
    connectUsingMongoose();
});