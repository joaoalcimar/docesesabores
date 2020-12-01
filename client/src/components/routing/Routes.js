import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Alert from '../layout/construct/Alert';
import IngredientsList from '../layout/admin/IngredientsList';
import NewIngredient from '../layout/admin/NewIngredient';
import EditIngredient from '../layout/admin/EditIngredient';
import RecipesList from '../layout/admin/RecipesList';
import NewRecipe from '../layout/admin/NewRecipe';
import EditRecipe from '../layout/admin/EditRecipe';
import Contacts from '../layout/user/Contacts';
import Budget from '../layout/user/Budget';
import About from '../layout/user/About';
import Home from '../layout/admin/Home';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/contacts' component={Contacts} />
        <Route exact path='/newingredient' component={NewIngredient} />
        <Route exact path='/ingredientsList' component={IngredientsList} />
        <Route exact path='/editIngredient' component={EditIngredient} />
        <Route exact path='/newRecipe' component={NewRecipe} />
        <Route exact path='/recipesList' component={RecipesList} />
        <Route exact path='/editRecipe' component={EditRecipe} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/budget' component={Budget} />
        <Route exact path='/about' component={About} />
      </Switch>
    </section>
  );
};

export default Routes;