// Importing the doctor model from the database schema
import { doctorModel } from "../models/doctor.schema.js";
// Importing jsonwebtoken to generate JWT tokens for authentication
import jwt from 'jsonwebtoken';

// Controller function for doctor login
export const doctorLogin = async (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body;
    try {
        // Find doctor by username
        let user = await doctorModel.findOne({ username });

        // If user not found or password does not match, send error response
        if (!user || (user.password != password)) {
            return res.status(422).send({
                message: "Invalid Username or Password"
            });
        }

        // If login is successful, generate JWT token and send it in response
        return res.status(200).send({
            message: "Sign in successful. Here is your token, please keep it safe",
            token: jwt.sign(user.toJSON(), 'secretjwtkey', { expiresIn: '1000000' })
        });
    }
    catch (error) {
        // Handle server errors
        console.log('Error', error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

// Controller function for doctor registration
export const doctorRegister = async (req, res) => {
    const { username, password, name } = req.body;
    try {
        let doctor = await doctorModel.findOne({ username });

        // Check if doctor already exists
        if (doctor) {
            return res.status(409).send({
                message: 'Doctor already exists',
            });
        }

        // Create new doctor record in the database
        const newUser = await doctorModel.create({ username, password, name });

        // Send success response with doctor information
        return res.status(201).send({
            status: true,
            message: 'Doctor registered successfully',
            doctorInfo: newUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Internal Server Error"
        });
    }
}