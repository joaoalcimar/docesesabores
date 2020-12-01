const mongoose = require('mongoose');
const Recipe = require('./Recipe');

const budgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  items: {
    type: [Recipe],
    required: true,
  },
});

module.exports = Budget = mongoose.model('budget', budgetSchema);
