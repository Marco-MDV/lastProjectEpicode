const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    PAN: {
      type: String,
      required: true
    },
    CVV: {
      type: String,
      required: true
    },
    expirationDate: {
      type: String,
      required: true
    },
    expenditure: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expenditure'
    }],
    revenue: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Revenue'
    }]
  },{timestamps:true, strict:true})
const Card = mongoose.model('Card', cardSchema);
module.exports = Card;

