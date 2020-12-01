import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { editIngredient, getIngredient } from '../../../actions/ingredient';

const EditIngredient = ({editIngredient, isAuthenticated, ingredient:{currentIngredient} }) => {

  const [formData, setFormData] = useState({
    name: currentIngredient.name,
    price: '',
    unity: '',
    quantity: ''
  });

  const { name, price, unity, quantity } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    editIngredient(name, price, unity, quantity);
    e.preventDefault();
  };

  var priceField = "O preço atual é R$ " + currentIngredient.price ;
  var unityField = "A unidade atual é " + currentIngredient.unity;
  var quantityField = "A quantidade de produto atual é " + currentIngredient.quantity;

  const logged = (      
    <Fragment>
        <section className="bg">
        <section className="container">
      <h1 className='large text-primary'>Ingrediente</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Edite o ingrediente selecionado
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
         <input
            type='name'
            id = 'name'
            placeholder='Nome'
            name='name'
            value={currentIngredient.name}
            onChange={onChange}
            required
          /> 
        </div>
        <div className='form-group'>
          <input
            type='price'
            id = 'price'
            placeholder={priceField}
            name='price'
            value={price}
            onChange={onChange}
          />
        </div>
        <div className='form-selected-items'>
        <select name="unity" value={unity} onChange={onChange} id = 'unity'>
        <option hidden value="">{unityField}</option>
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
            placeholder={quantityField}
            name='quantity'
            value={quantity}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Salvar'/>

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

EditIngredient.propTypes = {
  editIngredient: PropTypes.func.isRequired,
  getIngredient: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  ingredient: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  currentIngredient: state.ingredient.currentIngredient,
  isAuthenticated: state.auth.isAuthenticated,
  ingredient: state.ingredient,
  
});


export default connect(mapStateToProps, {editIngredient, getIngredient})(EditIngredient);