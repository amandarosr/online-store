import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  render() {
    const { name, categoryProducts } = this.props;
    return (
      <aside className="aside">
        <label
          htmlFor={ `category-${name}` }
          data-testid="category"
          className="radio-label"
        >
          <input
            type="radio"
            value={ name }
            id={ `category-${name}` }
            name="category"
            onClick={ categoryProducts }
            className="category-radio"
          />
          <span>{ name }</span>
        </label>
      </aside>
    );
  }
}

Categories.propTypes = {
  categoryProducts: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
