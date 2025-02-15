// Importing Passport for authentication
import passport from 'passport';
// Importing JWT Strategy and ExtractJwt module from passport-jwt
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
// Importing the doctorModel from the doctor schema
import { doctorModel } from '../models/doctor.schema.js';


// Options for JWT Strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secretjwtkey'
};

// Using Passport JWT Strategy for authentication
passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {
    try {
        // Finding the doctor in the database using the extracted user ID from JWT payload
        const user = await doctorModel.findById(jwtPayload._id);
        // If user exists, authentication is successful
        if (user) {
            return done(null, user);
        }
        // If user is not found, authentication fails
        return done(null, false);
    } catch (error) {
        console.log('Error in finding the user from JWT', error);
        // If an error occurs, return the error
        return done(error);
    }
}));

export default passport;
