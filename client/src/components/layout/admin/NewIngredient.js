import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addIngredient } from '../../../actions/ingredient';

const NewIngredient = ({ addIngredient, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unity: '',
    quantity: ''
  });

  const { name, price, unity, quantity } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    addIngredient(name, price, unity, quantity);
    e.preventDefault();
    document.getElementById("name").value = '';
    document.getElementById("price").value = '';
    document.getElementById("unity").value = '';
    document.getElementById("quantity").value = '';
  };

  const logged = (      
    <Fragment>
      <section className="bg">
        <section className="container">
        <h1 className='large text-primary'>Ingrediente</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Adicione um novo ingrediente
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
            type='price'
            id = 'price'
            placeholder='Preço do ingrediente'
            name='price'
            value={price}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-selected-items' id = 'unity'>
        <select name="unity" value={unity} onChange={onChange}>
        <option hidden value="">Unidade do produto</option>
          <option value='kg'>Kg</option>
          <option value='g'>g</option>
          <option value='l'>L</option>
          <option value='ml'>mL</option>
          <option value='unidade'>Unidade</option>
        </select>
        </div>
        <div className='form-group'>
          <input
            type='quantity'
            id = 'quantity'
            placeholder='Quantidade que vem no produto'
            name='quantity'
            value={quantity}
            onChange={onChange}
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

NewIngredient.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {addIngredient})(NewIngredient);