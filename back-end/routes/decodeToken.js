const express = require('express');
const decodeToken = express.Router()
const jwt = require('jsonwebtoken')

decodeToken.post('/decodeToken', function(req, res, next) {
    const bearToken = req.headers.authorization
    const token = bearToken.split(' ')[1]
    try {
        jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
            if (err) {
                next({message: err , status: 401});
            } else {
                res.send(decoded).status(201)
            }
        });
    } catch (error) {
        next({error: error.message, status: 500})
    }
})

module.exports = decodeToken;