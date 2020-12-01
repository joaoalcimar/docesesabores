import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_INGREDIENT,
  EDIT_INGREDIENT,
  DELETE_INGREDIENT,
  GET_INGREDIENT,
  SELECT_INGREDIENT,
  INGREDIENT_ERROR,
  LIST_INGREDIENTS,
  GET_LENING
} from './types';


// Get ingredients list
export const getAllIngredients = () => async (dispatch) => {

  try {
    const res = await axios.get('api/ingredient/getall');
    dispatch({
      type: LIST_INGREDIENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INGREDIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Select ingredients
export const selectIngredient = (ingredient) => async dispatch => {
    dispatch({
      type: SELECT_INGREDIENT,
      payload: ingredient
    });

};

// Get single ingredient
export const getIngredient = (name) => async dispatch => {
  try {
    const res = await axios.get('api/ingredient', {
      params: {
        name: name
      }
    })

    dispatch({
      type: GET_INGREDIENT,
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: INGREDIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get len ingredient
export const getNumIngredients = () => async dispatch => {
  try {
    const res = await axios.get('api/ingredient/getlength');

    dispatch({
      type: GET_LENING,
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: INGREDIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Add Ingredient
export const addIngredient = (name, price, unity, quantity) => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, price, unity, quantity });
  
  try {
    const res = await axios.post('api/ingredient', body, config);

    dispatch({
      type: ADD_INGREDIENT,
      payload: res.data
    });
    dispatch(setAlert('Ingrediente adicionado!!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: INGREDIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Ingredient
export const deleteIngredient = (name) => async dispatch => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: 'api/ingredient',
      data: {
      name: name
      }
    })

    dispatch(setAlert('Ingrediente removido!!', 'success'));

    dispatch({
      type: DELETE_INGREDIENT,
      payload: res.data 
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: INGREDIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit ingredient

export const editIngredient = (name, price, unity, quantity) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, price, unity, quantity });

  try {
    const res = await axios.put('api/ingredient', body, config);

    dispatch({
      type: EDIT_INGREDIENT,
      payload: res.data
    });

    dispatch(setAlert('Ingrediente modificado com sucesso!!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: INGREDIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
