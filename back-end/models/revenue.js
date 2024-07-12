const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RevenueSchema = new Schema({
  revenue :{
    type: Number,
    require: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String
  }
},{timestamps:true, strict:true});

module.exports = mongoose.model('Revenue', RevenueSchema);
