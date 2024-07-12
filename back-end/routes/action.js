const express = require('express');
const action = express.Router();
const userSchema = require('../models/users');
const cardsSchema = require('../models/card');
const checkToken = require('../middleware/checkToken')

action.post('/action', checkToken, async (req, res, next) => {
    try {
        const user = req.user;
        
        if (req.body.action === 'exits') {
            const exits = [];
            
            for (const idCard of user.cards) {
                const card = await cardsSchema.findById(idCard).populate('expenditure');
                
                card.expenditure.forEach(expenditure => {
                    exits.push({ value: expenditure.expenditure, date: expenditure.date });
                });
            }
            
            exits.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            const exitsValue = exits.map(exit => exit.value);
            const exitsDates = exits.map(exit => exit.date);
            
            return res.status(200).json({ exitsValue, exitsDates });
            
        } else if (req.body.action === 'revenue') {
            const revenues = [];
            
            for (const idCard of user.cards) {
                const card = await cardsSchema.findById(idCard).populate('revenue');
                
                card.revenue.forEach(revenue => {
                    revenues.push({ value: revenue.revenue, date: revenue.date });
                });
            }
            
            revenues.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            const valuesRevenue = revenues.map(revenue => revenue.value);
            const datesRevenue = revenues.map(revenue => revenue.date);
            
            return res.status(200).json({ valuesRevenue, datesRevenue });
        }
    } catch (error) {
        next({ message: error.message, status: 404 });
    }
});


module.exports = action;
