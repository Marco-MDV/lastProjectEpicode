const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const googleStrategy = (new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.END_POINT_SERVER}/auth/google/callback`
},
    (accessToken, refreshToken, profile, cb) => {
        try {
            return cb(null, profile);
        } catch (error) {
            return cb(error.message);
        }
    }
));

module.exports = googleStrategy;