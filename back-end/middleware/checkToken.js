const userSchema = require('../models/users')
const jwt = require('jsonwebtoken')

const checkToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) {next({message : 'invalid token', status : 401})}
    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
        if (err) {next({message : 'invalid token', status : 401})}else{
            const user = await userSchema.findById(decoded.userId)
            if (!user) {next({message : 'user not found', status : 401})}
            req.user = user
            next()
        }  
    })
}

module.exports = checkToken;

