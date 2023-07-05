import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

export default class Header extends Component {
  render() {
    const { clickForProducts, inputValue, onInputChange } = this.props;

    return (
      <header>
        <label htmlFor="searchArea">
          <input
            type="text"
            id="searchArea"
            data-testid="query-input"
            name="inputValue"
            value={ inputValue }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="queryBtn">
          <button
            type="button"
            id="queryBtn"
            data-testid="query-button"
            onClick={ clickForProducts }
          >
            Pesquisar
          </button>
        </label>
        <Link
          to="/cartShop"
          data-testid="shopping-cart-button"
        >
          <button
            type="button"
            name="btn-ShopCart"
          >
            Carrinho
          </button>
        </Link>
        <h1 className="header-title">Online Shop</h1>
      </header>
    );
  }
}

Header.propTypes = {
  clickForProducts: PropTypes.func,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
}.isRequired;
