const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Surname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    img: {
        imgUrl:{
            type: String,
        },
        imgId:{
            type: String
        }
    },
    cards:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
},{timestamps:true, strict:true})
const User = mongoose.model('User', userSchema);
module.exports = User;