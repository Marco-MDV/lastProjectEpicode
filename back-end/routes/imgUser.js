const express = require('express')
const multer = require('multer')
const imgUser = express.Router()
const userSchema = require('../models/users')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const checkToken = require('../middleware/checkToken');


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


imgUser.post('/changePhoto', [checkToken, uploadCloud.single('img')], async (req,res, next)=>{
    try {
        const user = await req.user
        
        if (user.img.imgUrl && user.img.imgId) {
            await cloudinary.api.delete_resources(user.img.imgId)
        }
        const filter = { _id: user._id }
        const newCover = {
            $set: {
                img: {
                    imgUrl: req.file.path,
                    imgId: req.file.filename
                }
            }
        }
        await userSchema.updateMany(filter, newCover)
        const token = jwt.sign(
            { userId: user._id, Name: user.Name, Email: user.Email, role: user.role, img: {imgUrl: req.file.path, imgId: req.file.filename}},
            process.env.SECRET_JWT,
            { expiresIn: '1h' }
        )
        res.status(200).json({token, newImg: {imgUrl: req.file.path, imgId: req.file}})
    } catch (error) {
        next({error: error.message, status: 500})
    }
})

module.exports = imgUser;
