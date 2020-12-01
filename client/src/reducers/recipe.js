/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  SELECT_RECIPE,
  POPULATE_RECIPE,
  GET_RECIPE,
  RECIPE_ERROR,
  LIST_RECIPES,
} from '../actions/types'

const initialState = {
  recipes: [],
  currentIngredient: '',
  ingredientName: '',
  ingredientQuantity: '',
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIST_RECIPES:
      return {
        ...state,
        recipes: payload,
        loading: false,
      };
    case GET_RECIPE:
    case SELECT_RECIPE:
      return {
        ...state,
        currentIngredient: payload,
        ingredientsList : payload,
        loading: false
      };
    case POPULATE_RECIPE:
      return{
        ...state,
        ingredientQuantity: payload,
        ingredientName: payload
      }
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe._name !== payload),
        loading: false
      };
    case ADD_RECIPE:
      return{
        ...state,
        recipes: [payload, ...state.recipes],
        loading: false

      };
    case EDIT_RECIPE:
      return{
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe._name === payload.name ? { ...recipe} : recipe
        ),
        loading: false
      };
    case RECIPE_ERROR:
      return{
        ...state,
        error: payload,
        loading: false
      };        

    default:
      return state;
  }
}
