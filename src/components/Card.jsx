import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { name, img, price } = this.props;
    return (
      <div data-testid="product">
        <h3>{ name }</h3>
        <img src={ img } alt={ name } />
        <p>{ `R$: ${price}` }</p>
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
