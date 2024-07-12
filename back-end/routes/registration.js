const express = require('express')
const multer = require('multer')
const registration = express.Router()
const userSchema = require('../models/users')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storageFinance = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'finance',
        format: async (req, file) => 'png',
        public_id: async (req, file) => {file.originalname}
    },
})

const uploadCloud = multer({ storage: storageFinance })

registration.post('/registration', [uploadCloud.single('img')] ,async (req, res, next)=>{
    try {
        const {Name, Surname, Email, Password, role} = req.body
        const condition = await userSchema.findOne({Email})
        if (condition) {
            next({error: "you can't use this email", status: 403})
        }

        const newUser = new userSchema({
            Name,
            Surname,
            Email,
            Password: await bcrypt.hash(Password, 10),
            role,
            img: {
                imgUrl: req.file.path,
                imgId: req.file.filename
            },
        })
        const user = await newUser.save()
        const token = jwt.sign({
            userId: user._id,
            Name: user.Name,
            Email: user.Email,
            role: user.role,
            img: user.img
        }, process.env.SECRET_JWT)
        res.status(201).json(token)
    } catch (error) {
        next({error: error.message, status: 500})
    }
})

module.exports = registration;