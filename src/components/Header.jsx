import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';
import ShopLogo from '../fonts/online-store.png'

export default class Header extends Component {
  render() {
    const { clickForProducts, inputValue, onInputChange } = this.props;

    return (
      <header>
        <div className="title-div">
          <img src={ ShopLogo } alt="shop-logo" className="cart-icon" />
          <h1 className="header-title">Online Shop</h1>
        </div>
        <div className="searchbar-container">
          <label htmlFor="searchArea">
            <input
              type="text"
              id="searchArea"
              data-testid="query-input"
              name="inputValue"
              value={ inputValue }
              onChange={ onInputChange }
              placeholder="procurar um produto..."
            />
          </label>
          <label htmlFor="queryBtn">
            <button
              type="button"
              id="queryBtn"
              data-testid="query-button"
              onClick={ clickForProducts }
              className="search-btn"
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
              className="cart-btn"
            >
              Carrinho
            </button>
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  clickForProducts: PropTypes.func,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
}.isRequired;
