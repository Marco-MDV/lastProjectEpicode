const express = require('express')
const moneyManagement = express.Router()
const Card = require('../models/card')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const userSchema = require('../models/users')
const expenditureSchema = require('../models/expenditure')
const revenueSchema = require('../models/revenue')
const checkToken = require('../middleware/checkToken')

moneyManagement.post('/add', checkToken , async (req, res, next) => {
    try {
        const { cardId, action } = req.body;
        const user = req.user
        user.cards.map(async(card)=>{
            const cardIdString = card.toString()
            if (cardIdString === cardId) {
                const card = Card.findById(cardId);
                if (!card) {
                    next({error: error.message, status: 500})
                } else {
                    const { revenue, description, date, expenditure } = action;
                        if (expenditure) {
                            const newExpenditure = new expenditureSchema({
                                expenditure,
                                description,
                                date
                            })
                            const savedExpenditure = await newExpenditure.save();
                            await Card.findByIdAndUpdate(
                                cardId,
                                { $push: { expenditure: savedExpenditure._id } },
                                { new: true, useFindAndModify: false }
                            )
                        } else {
                            const newRevenue = new revenueSchema({
                                revenue,
                                description,
                                date
                            })
                            const savedRevenue = await newRevenue.save();
                            await Card.findByIdAndUpdate(
                                cardId,
                                { $push: { revenue: savedRevenue._id } },
                                { new: true, useFindAndModify: false }
                            )
                        }
                    res.status(200).json({ message: 'success' })
                }
            }
        })
        
    } catch (error) {
        next({error: error.message, status: 500})
    }
})

module.exports = moneyManagement;