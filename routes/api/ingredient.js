const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Ingredient = require('../../models/Ingredient');

router.post(
  '/',
  [
    auth,
    [
      check('name', 'É necessário colocar um nome').not().isEmpty(),
      check('price', 'É necessário colocar um preço').not().isEmpty(),
      check('price', "Preço precisa ser um valor numérico").isNumeric(),
      check('unity', 'É necessário colocar a unidade').not().isEmpty(),
      check('quantity', 'É necessário colocar a quantidade do produto').not().isEmpty(),
      check('quantity', "Quantidade precisa ser um valor numérico").isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, unity, quantity } = req.body;

    const ingredientFields = {};
    ingredientFields.user = req.user.id;
    if (name) ingredientFields.name = name;
    if (price) ingredientFields.price = price;
    if (unity) ingredientFields.unity = unity;
    if (quantity) ingredientFields.quantity = quantity;

    try {
      let ingredient = await Ingredient.findOne({ name });

      if (ingredient) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Não foi possível completar cadastro, ingrediente já registrado' }] });
      }

      //create

      ingredient = new Ingredient(ingredientFields);
      await ingredient.save();
      res.json(ingredient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get(
  '/',
  [auth, [check('name', 'Ingrediente sem nome').not().isEmpty()]],
  async (req, res) => {
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Get Ingredient
      let ingredient = await Ingredient.findOne({ name });

      if (!ingredient) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Ingrediente não cadastrado' }] });
      }

      res.json(ingredient);
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
      //Get Ingredient
      let ingredients = await Ingredient.find({}, {name:true, price:true, unity:true, quantity:true, _id:false});

      if (!ingredients) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Não há ingredientes registrados até o momento' }] });
      }

      var ingredientsLength = ingredients.length;

      res.json(ingredientsLength);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


router.get(
  '/getall',
  [auth],
  async (req, res) => {

    try {
      //Get Ingredient
      let ingredients = await Ingredient.find({}, {name:true, price:true, unity:true, quantity:true, _id:false});

      if (!ingredients) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Não há ingredientes registrados até o momento' }] });
      }

      res.json(ingredients);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.delete(
  '/',
  [auth, [check('name', 'Nome do ingrediente é necessário para esta operação').not().isEmpty()]],
  async (req, res) => {
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Remove Ingredient
      let ingredient = await Ingredient.findOne({ name });

      if (!ingredient) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Ingrediente não cadastrado' }] });
      }

      await Ingredient.findOneAndRemove({ name });

      res.json({ msg: 'Ingrediente removido com sucesso!!' });
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
      check('name', 'É necessário colocar o nome do ingrediente').not().isEmpty(),
      check('price', 'É necessário colocar o preço do ingrediente').not().isEmpty(),
      check('price', "Preço precisa ser um valor numérico").isNumeric(),
      check('unity', 'É necessário colocar a unidade do ingrediente').not().isEmpty(),
      check('quantity', 'É necessário colocar o quantidade do ingrediente').not().isEmpty(),
      check('quantity', "Quantidade precisa ser um valor numérico").isNumeric()
    ],
  ],
  async (req, res) => {
    try {
      const { name, price, unity, quantity } = req.body;
      let ingredient = await Ingredient.findOne({ name });
      if (!ingredient) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Ingrediente não cadastrado' }] });
      }

      // edit
      const ingredientFields = {};
      if (price) ingredientFields.price = price;
      if (unity) ingredientFields.unity = unity;
      if (quantity) ingredientFields.quantity = quantity;
      ingredient = await Ingredient.findOneAndUpdate(
        { name },
        { $set: ingredientFields },
        { new: true }
      );

      return res.json(ingredient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
