import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  GET_RECIPE,
  SELECT_RECIPE,
  RECIPE_ERROR,
  LIST_RECIPES,
  POPULATE_RECIPE,
  GET_LENREC
} from './types';


// Get recipes list
export const getAllRecipes = () => async (dispatch) => {

  try {
    const res = await axios.get('api/recipe/getall');
    dispatch({
      type: LIST_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Select recipes
export const selectRecipe = (recipe) => async dispatch => {
    dispatch({
      type: SELECT_RECIPE,
      payload: recipe
    });

};

// Get single recipe
export const getRecipe = (name) => async dispatch => {
  try {
    const res = await axios.get('api/recipe', {
      params: {
        name: name
      }
    })

    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get len recipe
export const getNumRecipes = () => async dispatch => {
  try {
    const res = await axios.get('api/recipe/getlength');

    dispatch({
      type: GET_LENREC,
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Add Recipe
export const addRecipe = (name, salePrice, ingredients, ingredientsQuantity) => async dispatch => {
  console.log(ingredientsQuantity);
  console.log(ingredients);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  var body = { name, salePrice, ingredients, ingredientsQuantity};
  
  try {
    const res = await axios.post('api/recipe', body, config);

    dispatch({
      type: ADD_RECIPE,
      payload: res.data
    });
    dispatch(setAlert('Receita adicionada!!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Populate Recipe

export const populateRecipe = (ingredientName, ingredientQuantity) => async dispatch => {
  dispatch({
    type: POPULATE_RECIPE,
    payload: ingredientName, ingredientQuantity
  });
  dispatch(setAlert('Ingrediente adicionado a receita com sucesso!!', 'success'));


}

// Delete Recipe
export const deleteRecipe = (name) => async dispatch => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: 'api/recipe',
      data: {
      name: name
      }
    })

    dispatch(setAlert('Receita removida!!', 'success'));

    dispatch({
      type: DELETE_RECIPE,
      payload: res.data 
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit Recipe

export const editRecipe = (name, price, unity, quantity) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, price, unity, quantity });

  try {
    const res = await axios.put('api/recipe', body, config);

    dispatch({
      type: EDIT_RECIPE,
      payload: res.data
    });

    dispatch(setAlert('Receita modificada com sucesso!!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
