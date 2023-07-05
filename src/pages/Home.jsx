import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Loading from '../components/Loading';
import CardMain from '../components/CardMain';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

export default class Home extends Component {
  state = {
    categoryList: [],
    loading: false,
    inputValue: '',
    results: [],
    productsByCategory: [],
    searched: false,
  };

  componentDidMount() {
    this.fetchCategoryList();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  fetchCategoryList = async () => {
    this.setState({ loading: true });
    const categories = await getCategories();
    this.setState({ categoryList: categories, loading: false });
  };

  clickForProducts = async () => {
    const { inputValue } = this.state;
    const apiProducts = await getProductsFromCategoryAndQuery('', inputValue);
    const data = apiProducts.results;
    this.setState({
      searched: true,
      results: data,
    });
  };

  clickCategoryForProducts = async (categoryId) => {
    const products = await getProductsFromCategoryAndQuery(categoryId);
    this.setState({
      productsByCategory: products.results,
      searched: false,
    });
  };

  render() {
    const { categoryList, loading, inputValue, results,
        productsByCategory, searched } = this.state;
    return (
      <div className="home-container">
        <Header
          clickForProducts={ this.clickForProducts }
          inputValue={ inputValue }
          onInputChange={ this.handleChange }
        />
        <main>
          {loading ? (
            <Loading />
          ) : (
            <div className="categories" >
              {categoryList
                && categoryList.map((products) => (
                  <Categories
                    categoryProducts={ () => this.clickCategoryForProducts(products.id) }
                    key={ products.id }
                    name={ products.name }
                    value={ products.name }
                  />
                ))}
            </div>
          )}
          <div id="card-container">
            { results.length && searched
              ? results.map((result) => (
                <Link
                  to={ `product/${result.id}` }
                  key={ result.id }
                  data-testid="product-detail-link"
                  className="card-link"
                >
                  <CardMain
                    name={ result.title }
                    img={ result.thumbnail }
                    price={ result.price }
                  />
                </Link>
              )) : null }
              { !results.length && searched
              ? <h3>Nenhum produto foi encontrado</h3> : null }
          </div>
          <div className="second-div">
            { !results.length && !productsByCategory.length
            ?  <h3
              className="initialMessage"
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria
            </h3> : null
            }
            <div id="productsCategory">
              {productsByCategory && !searched
                ? productsByCategory.map((products) => (
                  <Link
                    to={ `product/${products.id}` }
                    key={ products.id }
                    data-testid="product-detail-link"
                    className="card-link"
                  >
                    <CardMain
                      data-testid="product"
                      img={ products.thumbnail }
                      name={ products.title }
                      price={ products.price }
                    />
                  </Link>
                )) : null }
            </div>
          </div>
        </main>
      </div>
    );
  }
}
