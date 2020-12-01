import React, { Fragment, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import {getAllRecipes, deleteRecipe, selectRecipe} from '../../../actions/recipe';
import 'react-data-grid/dist/react-data-grid.css';

const RecipesList = ({ isAuthenticated, getAllRecipes, deleteRecipe, selectRecipe, recipe: {recipes}}) => {  useEffect(() => {getAllRecipes()});

  const [formData, setFormData] = useState({
    name: ''
  });

  const {name} = formData;

  const rowSelected = (rowIdx, row, column) => {
    setFormData({ ...formData, name: row.name});
    var selectedRecipe = row;
    selectRecipe(selectedRecipe);
  };

  const history = useHistory();

  const routeChange = (path) =>{  
    history.push(path);
  } 

  const deleteAction = (e) => {
    deleteRecipe(name);
    e.preventDefault();
  };

  const editAction = (e) => {
    routeChange('editRecipe');
    e.preventDefault();
  };
  
  const columns = [
    { key: 'name', name: 'Nome' },
    { key: 'salePrice', name: 'Preço de venda(R$)' },
    { key: 'productionCost', name: 'Preço de Fabricação(R$)' },
    { key: 'profit', name: 'Lucro(R$)' },
    { key: 'percentProfit', name: 'Lucro(%)' }
  ];
  
  var rows = recipes;

  const logged = (
    <Fragment>
          <section className="bg">
        <section className="container">
      <h1 className='large text-primary'>Lista de Receitas</h1>

        <ReactDataGrid columns={columns} rows={rows} selection={{ mode: 'single' }} onRowClick={rowSelected}/>

        <nav className='navbar-table'>        

        <form className='form' onSubmit={deleteAction}>
          <input type='submit' className='btn btn-primary' value='Remover' />
        </form>


        </nav>

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

RecipesList.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  selectRecipe: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  recipes: state.recipe.recipes,
  currentRecipe: state.recipe.currentRecipe,
  recipe: state.recipe
});

export default connect(mapStateToProps,{getAllRecipes, deleteRecipe, selectRecipe})(RecipesList);