/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_INGREDIENT,
  EDIT_INGREDIENT,
  DELETE_INGREDIENT,
  SELECT_INGREDIENT,
  GET_INGREDIENT,
  INGREDIENT_ERROR,
  LIST_INGREDIENTS,
  GET_LENING
} from '../actions/types'

const initialState = {
  ingredients : [],
  ingredientsLen: '',
  currentIngredient: '',
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIST_INGREDIENTS:
      return {
        ...state,
        ingredients: payload,
        loading: false,
      };
    case GET_INGREDIENT:
    case SELECT_INGREDIENT:
      return {
        ...state,
        currentIngredient: payload,
        loading: false
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient._name !== payload),
        loading: false
      };
    case GET_LENING:{
      return{
        ...state,
        loading: false,
        ingredientsLen : payload
      }
      }
    case ADD_INGREDIENT:
      return{
        ...state,
        ingredients: [payload, ...state.ingredients],
        loading: false

      };
    case EDIT_INGREDIENT:
      return{
        ...state,
        ingredients: state.ingredients.map(ingredient =>
          ingredient._name === payload.name ? { ...ingredient} : ingredient
        ),
        loading: false
      };
    case INGREDIENT_ERROR:
      return{
        ...state,
        error: payload,
        loading: false
      };        

    default:
      return state;
  }
}
