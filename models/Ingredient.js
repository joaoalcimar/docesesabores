const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  unity: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = Ingredient = mongoose.model('ingredient', ingredientSchema);
