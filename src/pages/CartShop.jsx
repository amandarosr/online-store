import React, { Component } from 'react';
import "../style/CartShop.css";

export default class CartShop extends Component {
  render() {
    return (
      <h3
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio
      </h3>
    );
  }
}
