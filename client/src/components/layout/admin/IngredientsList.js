import React, { Fragment, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import {getAllIngredients, deleteIngredient, selectIngredient} from '../../../actions/ingredient';
import 'react-data-grid/dist/react-data-grid.css';

const IngredientsList = ({ isAuthenticated, getAllIngredients, deleteIngredient, selectIngredient, ingredient: {ingredients}}) => {  useEffect(() => {getAllIngredients()});

  const [formData, setFormData] = useState({
    name: ''
  });

  const {name} = formData;

  const rowSelected = (rowIdx, row, column) => {
    setFormData({ ...formData, name: row.name});
    var selectedIngredient = row;
    selectIngredient(selectedIngredient);
  };

  const history = useHistory();

  const routeChange = (path) =>{  
    history.push(path);
  } 

  const deleteAction = (e) => {
    deleteIngredient(name);
    e.preventDefault();
  };

  const editAction = (e) => {
    routeChange('editIngredient');
    e.preventDefault();
  };
  
  const columns = [
    { key: 'name', name: 'Nome'},
    { key: 'price', name: 'Preço(R$)' },
    { key: 'unity', name: 'Unidade' },
    { key: 'quantity', name: 'Quantidade do produto' }
  ];
  
  var rows = ingredients;

  const logged = (
    <Fragment>
      <section className="bg">
      <section className="container">
      <h1 className='large text-primary'>Lista de Ingredientes</h1>

        <ReactDataGrid columns={columns} rows={rows} selection={{ mode: 'single' }} onRowClick={rowSelected}/>

        <nav className='navbar-table'>        

        <form className='form' onSubmit={deleteAction}>
          <input type='submit' className='btn btn-primary' value='Remover' />
        </form>

        <form className='form' id='form' onSubmit={editAction}>
          <input type='submit' className='btn btn-primary' value='Editar' />
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

IngredientsList.propTypes = {
  getAllIngredients: PropTypes.func.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
  selectIngredient: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  ingredient: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  ingredients: state.ingredient.ingredients,
  currentIngredient: state.ingredient.currentIngredient,
  ingredient: state.ingredient
});

export default connect(mapStateToProps,{getAllIngredients, deleteIngredient, selectIngredient})(IngredientsList);