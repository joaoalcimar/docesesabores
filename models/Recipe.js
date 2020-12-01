const mongoose = require('mongoose');
const Ingredient = require('./Ingredient');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },

  profit: {
    type: Number,
  },

  percentProfit: {
    type: Number,
  },

  productionCost: {
    type: Number,
  },

  salePrice: {
    type: Number,
    required: true,
  },

  ingredients: {
    type: [String],
    required: true,
  },

  ingredientsQuantity: {
    type: [Number],
    required: true,
  },
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
