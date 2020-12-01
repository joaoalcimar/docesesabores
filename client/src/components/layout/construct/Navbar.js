import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../../actions/auth'

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (      
  <ul>
    <Link to='/newIngredient' ><i className= 'fas fa-plus-circle' />{' '}Adicionar Ingredientes</Link>
    <Link to='/ingredientsList'><i className= 'fas fa-file-alt' />{' '}Listar Ingredientes</Link>
    <Link to='/newRecipe' ><i className= 'fas fa-plus-circle' />{' '}Adicionar Receitas</Link>
    <Link to='/recipesList'><i className= 'fas fa-file-alt' />{' '}Listar Receitas</Link>
    <a onClick = {logout} href = '#!'>
      <i className= 'fas fa-sign-out-alt' />{' '}
      <span className= 'hide-sm'>Logout</span>
    </a>
  </ul>

  );

  const guestLinks = (
  <ul>
    <Link to='/about'>Sobre nós</Link>
    <Link to='/login'>Login</Link>
    <Link to='/budget'>Orçamento</Link>
    <Link to='/contacts'>Contatos</Link>
  </ul>

  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/home">
          <i className="fas fa-birthday-cake" /> Doces e Sabores
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
