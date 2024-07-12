const express = require('express')
const card = express.Router()
const User = require('../models/users')
const Card = require('../models/card')
const mongoose = require('mongoose')
const userSchema = require('../models/users')
const expenditureSchema = require('../models/expenditure')
const revenueSchema = require('../models/revenue')
const checkToken = require('../middleware/checkToken');
const expenditure = require('../models/expenditure')


card.post('/addCard', checkToken , async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { PAN, CVV, Date } = await req.body.card;
        const regex = /^(\d{4})(\d{2})(\d{2})$/;
        const match = Date.match(regex);
        if (match) {
            let year = match[1];
            let month = match[2];
            let day = match[3];

            let expirationDate = `${year}/${month}/${day}`;
            if (PAN !== '' && CVV !== '' && expirationDate !== '') {
                const newCard = new Card({
                    PAN,
                    CVV,
                    expirationDate
                });
                const savedCard = await newCard.save();
    
                await User.findByIdAndUpdate(
                    userId,
                    { $push: { cards: savedCard._id } },
                    { new: true, useFindAndModify: false }
                ).populate('cards');
    
                res.status(200).json({PAN, CVV, expirationDate: newCard.expirationDate, _id: newCard._id});
            }else{
                next({ message: 'Invalid input', status: 422})
            }
        } else {
            next({message: 'Invalid date format.', status: 422})
        }
    } catch (error) {
        res.json({ error: error.message, status: 500});
    }
})


card.post('/searchCard', checkToken , async (req, res, next) => {
    try {
        const idUser = await req.user._id
        const user = await userSchema.findById(idUser).populate('cards');
        res.status(200).json(user.cards)
    } catch (error) {
        next({error: error.message , status: 500});
    }
})


card.delete('/deleteCard', checkToken , async (req, res, next) => {
    try {
        const { idCard } = req.body;
        const userInfo = req.user
        userInfo.cards.map(async(cardId)=>{
            const cardIdString = cardId.toString();
            if(cardIdString === idCard){
                const cardDeleted = await Card.findByIdAndDelete({ _id: idCard})
                if (cardDeleted.expenditure.length !== 0) {
                    cardDeleted.expenditure.map(async(expenditure)=>{
                        await expenditureSchema.findByIdAndDelete(expenditure)
                    })
                }
                if (cardDeleted.revenue.length !== 0) {
                    cardDeleted.revenue.map(async(revenue)=>{
                        await revenueSchema.findByIdAndDelete(revenue)
                    })
                }
                const user = await userSchema.findById(userInfo._id)
                user.cards = user.cards.filter(card => !card.equals(cardId));
                await user.save();
                res.status(200).json(idCard);
            }
        })
    } catch (error) {
        next({error: error.message, status: 404})
    }
})


card.patch('/updateCard', checkToken , async (req, res, next) => {
    try {
        const { idCard, PAN, CVV, Date } = req.body;
        const infoUser = req.user
        infoUser.cards.map(async(card)=>{
            const cardIdString = card.toString()
            if (cardIdString === idCard) {
                const regex = /^(\d{4})(\d{2})(\d{2})$/;
                const formatData = Date.match(regex);
                const dataFormattata = `${formatData[1]}/${formatData[2]}/${formatData[3]}`;
                await Card.findByIdAndUpdate(idCard, {PAN, CVV, expirationDate:dataFormattata }, { new: true, useFindAndModify: false });
                const arrayCards = await userSchema.findById(req.user._id).populate('cards');
                res.status(200).json(arrayCards.cards);      
            }
        })
    } catch (error) {
        next({error: error.message, status: 500})
    }
})

module.exports = card;