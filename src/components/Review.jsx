import { Component } from 'react';
import PropTypes from 'prop-types';

class Review extends Component {
  render() {
    const num = 5;
    const { email, rating, text } = this.props;
    return (
      <div className="review">
        <p data-testid="review-card-email" className="reviewEmail">
          { email }
        </p>
        <div data-testid="review-card-rating" className="reviewRating">
          { [...Array(num)].map((star, index) => (
            <span
              key={ index + 1 }
              className={ (index + 1) <= rating ? 'on' : 'off' }
            >
              &#9733;
            </span>
          ))}
        </div>
        <p data-testid="review-card-evaluation" className="reviewComment">
          { text }
        </p>
      </div>
    );
  }
}

Review.propTypes = {
  email: PropTypes.string,
  rating: PropTypes.number,
  text: PropTypes.string,
}.isRequired;

export default Review;
