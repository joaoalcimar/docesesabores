const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Ingredient = require('../../models/Ingredient');
const Recipe = require('../../models/Recipe');

router.post(
  '/',
  [
    auth,
    [
      check('name', 'É necessário colocar um nome').not().isEmpty(),
      check('salePrice', 'É necessário colocar um preço de venda').not().isEmpty(),
      check('salePrice', 'Preço de venda precisa ser um valor numérico').isNumeric(),
      check('ingredients', 'É necessário colocar ingredientes').isArray(),
      check('ingredientsQuantity', 'É necessário colocar a quantidade dos ingredientes')
        .isArray(),

    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, salePrice, ingredients, ingredientsQuantity } = req.body;

    if(ingredients.length !== ingredientsQuantity.length){
      return res
      .status(400)
      .json({ errors: [{ msg: 'Não foi possível cadastrar, a quantidade de elementos está errada' }] });
    }

    const recipeFields = {};
    recipeFields.user = req.user.id;

    // typed
    if (name) recipeFields.name = name;
    if (salePrice) recipeFields.salePrice = salePrice;
    if (ingredientsQuantity)
      recipeFields.ingredientsQuantity = ingredientsQuantity;
    if (ingredients) recipeFields.ingredients = ingredients;

    var count = 0;
    for (var k in ingredients) {
      if (ingredients.hasOwnProperty(k)) {
        count++;
      }
    }

    let productionCost = 0;

    for (var i = 0; i < count; i++) {
      const { newIngredientName } = req.body.ingredients[i];
      newIngredient = await Ingredient.findOne({ newIngredientName });
      productionCost += newIngredient.price * ingredientsQuantity[i];
    }

    recipeFields.profit = salePrice - productionCost;
    recipeFields.percentProfit =
      ((salePrice - productionCost) / productionCost) * 100;
    recipeFields.productionCost = productionCost;

    //rounding
    recipeFields.productionCost = Math.round(recipeFields.productionCost);
    recipeFields.profit = Math.round(recipeFields.profit);
    recipeFields.percentProfit = Math.round(recipeFields.percentProfit);

    try {
      let recipe = await Recipe.findOne({ name });

      if (recipe) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Não foi possível cadastrar, a receita já existe' }] });
      }

      //create

      recipe = new Recipe(recipeFields);

      await recipe.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get(
  '/getall',
  [auth],
  async (req, res) => {

    try {

      let recipes = await Recipe.find({}, {ingredients:true, ingredientsQuantity:true, name:true, salePrice:true, profit:true, percentProfit:true, productionCost:true, _id:false});

      if (!recipes) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Não há receitas registradas até o momento' }] });
      }

      res.json(recipes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//get len
router.get(
  '/getlength',
  [auth],
  async (req, res) => {

    try {

      let recipes = await Recipe.find({}, {ingredients:true, ingredientsQuantity:true, name:true, salePrice:true, profit:true, percentProfit:true, productionCost:true, _id:false});

      if (!recipes) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Não há receitas registradas até o momento' }] });
      }
      let recipesLength = recipes.length;
      res.json(recipesLength);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get(
  '/',
  [auth, [check('name', 'É necessário um nome para completar a requisição').not().isEmpty()]],
  async (req, res) => {
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Get Recipe
      let recipe = await Recipe.findOne({ name });

      if (!recipe) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'A receita solicitada não está cadastrada' }] });
      }

      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.delete(
  '/',
  [auth, [check('name', 'É necessário colocar um nome').not().isEmpty()]],
  async (req, res) => {
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Remove Recipe
      let recipe = await Recipe.findOne({ name });

      if (!recipe) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'A receita solicitada não está cadastrada' }] });
      }

      await Recipe.findOneAndRemove({ name });

      res.json({ msg: 'Receita deletada com sucesso!!' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.put(
  '/',
  [
    auth,
    [
      check('name', 'É necessário colocar um nome').not().isEmpty(),
      check('salePrice', 'É necessário colocar um preço de venda').not().isEmpty(),
      check('salePrice', 'Preço de venda precisa ser um valor numérico').isNumeric(),
      check('ingredients', 'É necessário colocar ingredientes').not().isEmpty(),
      check('ingredientsQuantity', 'É necessário colocar a quantidade dos ingredientes')
        .not()
        .isEmpty(),
      check('ingredientsQuantity', 'É necessario que as quantidades dos ingredientes seja num valor numérico')
        .isNumeric()
    ],
  ],
  async (req, res) => {
    try {
      const { name, salePrice, ingredients, ingredientsQuantity } = req.body;
      let recipe = await Recipe.findOne({ name });
      if (!recipe) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'A receita solicitada não está cadastrada' }] });
      }

      // edit
      const recipeFields = {};
      if (salePrice) recipeFields.salePrice = salePrice;
      if (ingredients) recipeFields.ingredients = ingredients;
      if (ingredientsQuantity)
        recipeFields.ingredientsQuantity = ingredientsQuantity;

      var count = 0;
      for (var k in ingredients) {
        if (ingredients.hasOwnProperty(k)) {
          count++;
        }
      }

      let productionCost = 0;

      for (var i = 0; i < count; i++) {
        const { newIngredientName } = req.body.ingredients[i];
        newIngredient = await Ingredient.findOne({ newIngredientName });
        productionCost += newIngredient.price * ingredientsQuantity[i];
      }

      recipeFields.profit = salePrice - productionCost;
      recipeFields.percentProfit =
        ((salePrice - productionCost) / productionCost) * 100;
      recipeFields.productionCost = productionCost;

      recipe = await Recipe.findOneAndUpdate(
        { name },
        { $set: recipeFields },
        { new: true }
      );

      return res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
