import React from "react";
import PropTypes from "prop-types";
import "../style/Card.css";

class Card extends React.Component {
  render() {
    const { name, img, price } = this.props;
    return (
      <div data-testid="product" className="productCard">
        <img src={img} alt={name} className="productImg"/>
        <h3 className="productName">{name}</h3>
        <span>
          <p className="priceSymbol">R$</p>
          <p className="priceNumber">{price}</p>
        </span>
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Card;
