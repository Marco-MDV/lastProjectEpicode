const express = require('express')
const login = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const registrationSchema = require('../models/users')

login.post('/login', async (req, res, next) => {
    try {
        const user = await registrationSchema.findOne({ Email: req.body.Email })
        if (!user) {
            return next({ error: 'User not found' })
        }
        const isPasswordMatch = bcrypt.compareSync(req.body.Password, user.Password)
        if (!isPasswordMatch) {
            return next({ error: 'Password is wrong' })
        }
        const token = jwt.sign(
            { userId: user._id, Name: user.Name, Email: user.Email, role: user.role, img: user.img },
            process.env.SECRET_JWT,
            { expiresIn: '1h' }
        )
        res.status(200).json({ token })
    } catch (error) {
        next({error: error.message, status: 500})
    }
})

module.exports = login;
