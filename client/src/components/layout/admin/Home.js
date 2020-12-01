import React, { Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNumIngredients } from '../../../actions/ingredient';
import { getNumRecipes } from '../../../actions/recipe';

const Home = ({ login, isAuthenticated, getNumIngredients, getNumRecipes, ingredient: {ingredientsLen,ingredients}, recipe: {recipesLen,recipes}}) => {

  const logged = (      
    <Fragment>
      <section className="bg">
      <section className="container">

        
      <section className="cupcake"/>
      

      </section>
      </section>
    </Fragment>
    
  );

  const notLogged = (
    <ul>    
      <Redirect to='/login' />;
    </ul>
  );
  return (
    <Fragment>{isAuthenticated ? logged : notLogged}</Fragment>
  );

};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  getNumIngredients: PropTypes.func.isRequired,
  getNumRecipes:  PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  ingredientsLen: state.ingredient.ingredientsLen,
  recipesLen: state.recipe.recipesLen,
  ingredient: state.ingredient,
  recipe: state.recipe
});

export default connect(mapStateToProps, {getNumIngredients, getNumRecipes})(Home);