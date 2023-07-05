import React from 'react';
import PropTypes from 'prop-types';

class CardMain extends React.Component {
  render() {
    const { name, img, price } = this.props;
    return (
      <div data-testid="product" className="main-card">
        <img 
          src={ img }
          alt={ name }
        />
        <h3>{ name }</h3>
        <p><span>R$</span>{ price }</p>
      </div>
    );
  }
}

CardMain.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CardMain;
