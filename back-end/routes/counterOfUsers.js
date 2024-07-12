const express = require('express');
const counterOfUsers = express.Router();
const users = require('../models/users')

counterOfUsers.get('/counterOfUsers', async (req, res, next) => {
    try {
        const numbUsers = await users.countDocuments()
        res.status(200).json(numbUsers)
    } catch (error) {
        next({error: error.message, status: 500});
    }
})

module.exports = counterOfUsers;