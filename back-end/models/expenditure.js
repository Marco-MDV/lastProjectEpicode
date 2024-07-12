const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenditureSchema = new Schema({
  expenditure:{
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
},{timestamps:true, strict:true});

module.exports = mongoose.model('Expenditure', ExpenditureSchema);