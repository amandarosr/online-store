import { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import Reviews from '../components/Reviews';
import './ProductDetails.css';
import BackArrow from '../fonts/arrow.png'

export default class ProductDetails extends Component {
  state = {
    productData: {},
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match } = this.props;
    const { params: { id } } = match;
    const productData = await getProductById(id);
    this.setState({ productData });
  };

  render() {
    const { productData } = this.state;
    const { title, price, thumbnail } = productData;

    return (
      <div className="details-page">
        <Header />
        <div className="page-block">
          <Link to="/" className="back-link"><img src={ BackArrow } alt="back-arrow" /></Link>
          <main className="details-container">
            <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
            <div className="details-content">
              <div className="details-title">
                <h2 data-testid="product-detail-name">
                  {title}
                </h2>
                <span data-testid="product-detail-price" className="details-price">
                  <span>R$</span>
                  { price }
                </span>
              </div>
              <div className="details-specs">
                <h3>Especificações técnicas</h3>
                <ul>
                  <li>Lorem ipsum dolor sit</li>
                  <li>Veniam, expedita reprehenderit error </li>
                  <li>At iste tempora pariatur!</li>
                  <li>Sequi dolores quas</li>
                  <li>Illo suscipit voluptas veritatis ipsa possimus iste assumenda</li>
                </ul>
              </div>
            </div>
          </main>
          <div className="reviews-container">
            <Reviews data={ productData } />
          </div>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
