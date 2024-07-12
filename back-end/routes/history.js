const express = require('express');
const history = express.Router();
const cardSchema = require('../models/card')
const expenditureSchema = require('../models/expenditure')
const revenuesSchema = require('../models/revenue')
require('dotenv').config();
const checkToken = require('../middleware/checkToken')


history.post('/historySingleCard', checkToken , async (req, res, next) => {
    try {
        const { cardId , action , pageSize , page} = await req.body;
        const user = req.user;
        if (user.cards.includes(cardId)) {
            if (action === 'expenditures') {
                const card = await cardSchema.findById(cardId).populate('expenditure')
                if (!card) {
                    return res.status(404).json({ message: 'Card not found' });
                }
                const expenditurePaginated = card.expenditure.slice((page - 1) * pageSize, page * pageSize);
                const totPage = Math.ceil(card.expenditure.length / pageSize)
                res.status(200).json({
                    expenditure: expenditurePaginated,
                    page: +page,
                    pageSize: +pageSize,
                    totalExpenditure: card.expenditure.length,
                    totPage
                });
            }else if (action === 'revenues') {
                const card = await cardSchema.findById(cardId).populate('expenditure').populate('revenue');
                if (!card) {
                    return res.status(404).json({ message: 'Card not found' });
                }
                const revenuePaginated = card.revenue.slice((page - 1) * pageSize, page * pageSize);
                const totPage = Math.ceil(card.revenue.length / pageSize)
                res.status(200).json({
                    revenue: revenuePaginated,
                    page: +page,
                    pageSize: +pageSize,
                    totalRevenue: card.revenue.length,
                    totPage
                });
            }
        } else {
            res.status(403).json({ message: 'Unauthorized access to card' });
        }
    } catch (error) {
        next({ error: error.message, status: 500 });
    }
});


history.delete('/deleteMovement', checkToken, async (req, res, next) => {
    try {
        const { idMovement, type, idCard } = await req.body
        const user = await req.user
        if (type === 'expenditures') {
            user.cards.map(async (cardId) => {
                const cardIdString = cardId.toString()
                if (cardIdString === idCard) {
                    const card = await cardSchema.findById(cardId)
                    card.expenditure = card.expenditure.filter(expenditure => {
                        const expenditureIdCardString = expenditure.toString();
                        return expenditureIdCardString !== idMovement;
                    })
                    await card.save()
                    await expenditureSchema.findByIdAndDelete(idMovement)
                    const newArr = await card.populate('expenditure')
                    res.status(200).json({ newArrActions: newArr.expenditure })
                }
            })
        } else if (type === 'revenues') {
            user.cards.map(async (cardId) => {
                const cardIdString = cardId.toString()
                if (cardIdString === idCard) {
                    const card = await cardSchema.findById(cardId);
                    card.revenue = card.revenue.filter(revenueIdCard => {
                        const revenueIdCardString = revenueIdCard.toString();
                        return revenueIdCardString !== idMovement;
                    });
                    await card.save();
                    await revenuesSchema.findByIdAndDelete(idMovement);
                    const newArr = await card.populate('revenue');
                    res.status(200).json({ newArrActions: newArr.revenue });
                }
            });

        } else {
            next({ message: 'select a type action', status:404 })
        }
    } catch (error) {
        next({error: error.message, status: 500});
    }
})


history.post('/modAction', checkToken, async (req, res, next) => {
    try {
        const { idCard, idMovement, description, value, date, type } = await req.body
        const user = await req.user
        user.cards.map(async (card) => {
            const cardString = await card.toString();
            if (cardString === idCard) {
                console.log(value);
                if (value !== null && date !== null && description !== null) {
                    if (type === 'expenditures') {
                        await expenditureSchema.findByIdAndUpdate({
                            _id: idMovement
                        }, {
                            expenditure: value,
                            description: description,
                            date: date
                        }, {
                            new: true,
                            upsert: true
                        })
                        const newArr = await cardSchema.findById(cardString).populate('expenditure')
                        res.status(200).json({ newArrActions: newArr.expenditure })
                    } else if (type === 'revenues') {
                        await revenuesSchema.findByIdAndUpdate({
                            _id: idMovement
                        }, {
                            revenue: value,
                            description: description,
                            date: date
                        }, {
                            new: true,
                            upsert: true
                        })
                        const newArr = await cardSchema.findById(cardString).populate('revenue')
                        res.status(200).json({ newArrActions: newArr.revenue })
                    } else {
                        next({ message: 'Select a type action', status: 400 })
                    }
                } else {
                    next({ message: 'All fields are required', status: 400 })
                }
            }
        })
    } catch (error) {
        next({error: error.message, status: 500})
    }
})


module.exports = history;