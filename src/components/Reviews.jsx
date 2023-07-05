import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review';
import './Reviews.css';

class Reviews extends React.Component {
  state = {
    rating: 0,
    email: '',
    comment: '',
    emailValid: false,
    ratingValid: false,
    formValid: true,
  };

  setRating = (index) => {
    this.setState({
      rating: index,
    });
    if (index >= 1) {
      this.setState({
        ratingValid: true,
      });
    }
  };

  resetRating = () => {
    this.setState({
      rating: 0,
      ratingValid: false,
    });
  };

  handleEmailChange = (event) => {
    if (event.target.validity.valid) {
      this.setState({
        emailValid: true,
      });
    }
    this.setState({
      email: event.target.value,
    });
  };

  handleCommentChange = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };

  resetForm = () => {
    this.setState({
      rating: 0,
      email: '',
      comment: '',
      emailValid: false,
      ratingValid: false,
      formValid: true,
    });
  };

  saveReview = () => {
    const { email, rating, comment, formValid } = this.state;
    const { data: { id } } = this.props;
    const storageArray = JSON.parse(localStorage.getItem(id));
    if (formValid) {
      const newReview = {
        email,
        text: comment,
        rating,
      };
      storageArray.push(newReview);
      localStorage.setItem(id, JSON.stringify(storageArray));
      this.resetForm();
    }
  };

  createLocalStorage = () => {
    const { data: { id } } = this.props;
    if (!localStorage[id]) {
      localStorage.setItem(id, JSON.stringify([]));
    }
  };

  render() {
    // localStorage.clear();
    const num = 5;
    const { rating, comment, email, emailValid,
      ratingValid, formValid } = this.state;
    const { data: { id } } = this.props;
    return (
      <form>
        <h3>Avaliações</h3>
        <input
          data-testid="product-detail-email"
          id="emailInput"
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleEmailChange }
          required
        />
        <div id="starContainer">
          { [...Array(num)].map((star, index) => (
            <button
              type="button"
              className="rateBtn"
              key={ index + 1 }
              value={ rating }
              onClick={ () => this.setRating(index + 1) }
              onDoubleClick={ this.resetRating }
            >
              <span
                className={ (index + 1) <= rating ? 'on' : 'off' }
                data-testid={ `${index + 1}-rating` }
                key={ index + 1 }
              >
                &#9733;
              </span>
            </button>
          ))}
        </div>
        <textarea
          data-testid="product-detail-evaluation"
          id="commentInput"
          placeholder="Mensagem (opcional)"
          value={ comment }
          onChange={ this.handleCommentChange }
        />
        <div>
          { !formValid ? <p data-testid="error-msg">Campos inválidos</p> : '' }
        </div>
        <button
          data-testid="submit-review-btn"
          type="button"
          className="review-btn"
          onClick={ () => {
            if (!emailValid || !ratingValid) {
              this.setState({
                formValid: false,
              });
            } else {
              this.setState({
                formValid: true,
              });
              this.createLocalStorage();
              this.saveReview();
            }
          } }
        >
          Avaliar
        </button>
        <div id="publishedRevs">
          { localStorage[id] && localStorage[id] !== '[]'
            ? JSON.parse(localStorage.getItem(id)).map((rev, index) => (
              <Review
                key={ index }
                email={ rev.email }
                rating={ rev.rating }
                text={ rev.text }
              />
            )) : '' }
        </div>
      </form>
    );
  }
}

Reviews.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default Reviews;
