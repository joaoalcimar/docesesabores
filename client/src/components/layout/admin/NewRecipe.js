import React, { Fragment, useState} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addRecipe } from '../../../actions/recipe';

const NewRecipe = ({ addRecipe, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    name: '',
    salePrice: '',
    ingredients: '',
    ingredientsQuantity: ''
  });
  
  const { name, salePrice, ingredients, ingredientsQuantity } = formData;

  const onChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    addRecipe(name, salePrice, ingredients, ingredientsQuantity);
    e.preventDefault();
  };


  const logged = (      
    <Fragment>
      <section className="bg">
      <section className="container">
      <h1 className='large text-primary'>Receita</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Adicione uma nova Receita
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
         <input
            type='name'
            id = 'name'
            placeholder='Nome'
            name='name'
            value={name}
            onChange={onChange}
            required
          /> 
        </div>
        <div className='form-group'>
          <input
            type='salePrice'
            id = 'salePrice'
            placeholder='Preço que a receita será vendida'
            name='salePrice'
            value={salePrice}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='ingredients'
            id = 'ingredients'
            placeholder='Digite o nome do ingrediente que você deseja adicionar'
            name='ingredients'
            value={ingredients}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='ingredientsQuantity'
            id = 'ingredientsQuantity'
            placeholder='Digite a quantidade desse ingrediente que vai na receita'
            name='ingredientsQuantity'
            value={ingredientsQuantity}
            onChange={onChange}
            required
          />
        </div>
          <input type='submit' className='btn btn-primary' value='Adicionar'/>
          </form>
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

NewRecipe.propTypes = {
  addRecipe: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  recipes: state.recipes
});


export default connect(mapStateToProps, {addRecipe})(NewRecipe);