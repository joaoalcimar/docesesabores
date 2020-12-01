const mongoose = require('mongoose');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  numberOfRecipes: {
    type: Number,
  },

  numberOfIngredients: {
    type: Number,
  },

  contacts: [
    {
      facebook: {
        type: String,
      },

      instagram: {
        type: String,
      },

      telephone: {
        type: String,
      },

      adress: {
        type: String,
      },

      to: {
        type: Date,
      },

      current: {
        type: Boolean,
        default: false,
      },

      description: {
        type: String,
      },
    },
  ],

});

module.exports = User = mongoose.model('user', UserSchema);
