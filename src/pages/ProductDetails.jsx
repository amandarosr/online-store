import { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { getProductById } from "../services/api";
import HeaderSimple from "../components/HeaderSimple";
import Reviews from "../components/Reviews";
import "../style/ProductDetails.css";

export default class ProductDetails extends Component {
  state = {
    productData: {},
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match } = this.props;
    const {
      params: { id },
    } = match;
    const productData = await getProductById(id);
    this.setState({ productData });
  };

  render() {
    const { productData } = this.state;
    const { title, price, thumbnail } = productData;

    return (
      <>
        <HeaderSimple />
        <main className="productDetailMain">
          <h3 id="product-detail-name">{title}</h3>
          <div className="contentCase">
            <div>
              <img
                src={thumbnail}
                alt={title}
                data-testid="product-detail-image"
                id="productDetailImage"
              />
            </div>
            <div className="productDetailSpecs">
              <h3>Especificações técnicas</h3>
              <ul>
                <li>Lorem ipsum dolor sit</li>
                <li>Veniam, expedita reprehenderit error </li>
                <li>At iste tempora pariatur!</li>
                <li>Sequi dolores quas</li>
                <li>
                  Illo suscipit voluptas veritatis ipsa possimus iste assumenda
                </li>
              </ul>
              <div id="bottomInfo">
                <div id="product-detail-price">
                  <p>R$</p>
                  <p>{price}</p>
                </div>
                <button>Adicionar ao carrinho</button>
              </div>
            </div>
          </div>
          <Reviews data={productData} />
        </main>
        <footer>
          <p>© 2024 fake•store. All Rights Reserved</p>
        </footer>
      </>
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
