const express = require('express');
const google = express.Router();
const passport = require('passport');
const googleStrategy = require('../middleware/oauthGoogle')
const user = require('../models/users')
const jwt = require('jsonwebtoken');
require('dotenv').config();
passport.use('google', googleStrategy)


google.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

google.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${process.env.END_POINT_CLIENT}/login` }), async function (req, res, next) {
    try {
        const googleUser = await user.findOne({ Email: req.user._json.email })
        if (!googleUser) {
            const newUser = new user({
                Name: req.user._json.given_name,
                Surname: req.user._json.family_name,
                Email: req.user._json.email,
                Password: 'Pa$$w0rd!',
                role: 'user',
                img: {
                    imgUrl: req.user._json.picture,
                },
                cards: []
            })
            await newUser.save()
            const token = jwt.sign(
                {
                    userId: newUser._id,
                    Name: newUser.Name,
                    Email: newUser.Email,
                    role: newUser.role,
                    img: newUser.img,
                }, process.env.SECRET_JWT,
                { expiresIn: '1h' }
            )
            res.redirect(`${process.env.END_POINT_CLIENT}/profile/${token}`)
        } else {
            const token = jwt.sign(
                {
                    userId: googleUser._id,
                    Name: googleUser.Name,
                    Email: googleUser.Email,
                    role: googleUser.role,
                    img: googleUser.img,
                }, process.env.SECRET_JWT,
                { expiresIn: '1h' }
            )
            res.redirect(`${process.env.END_POINT_CLIENT}/profile/${token}`)
        }
    } catch (error) {
        next({error: error.message, status: 500});
    }
});

module.exports = google;