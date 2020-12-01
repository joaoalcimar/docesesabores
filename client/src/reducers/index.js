import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import ingredient from './ingredient';
import recipe from './recipe';

export default combineReducers({
  alert,
  auth,
  ingredient,
  recipe
});