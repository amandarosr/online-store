import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../style/Home.css";
import Categories from '../components/Categories';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Card from '../components/Card';
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
    noResults: false,
  };

  componentDidMount() {
    this.fetchCategoryList();
    this.clickCategoryForProducts('MLB1246');
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
      results: data,
      noResults: false,
    });
    if (data.length === 0) {
      this.setState({
        noResults: true
      })
    }
  };

  clickCategoryForProducts = async (categoryId) => {
    const products = await getProductsFromCategoryAndQuery(categoryId);
    this.setState({
      productsByCategory: products.results,
      noResults: false,
    });
    if (products.results.length === 0) {
      this.setState({
        noResults: true
      })
    }
  };

  render() {
    const { categoryList, loading, inputValue, results, 
      productsByCategory, noResults } = this.state;
    return (
      <>
        <Header
          clickForProducts={ this.clickForProducts }
          inputValue={ inputValue }
          onInputChange={ this.handleChange }
        />
        <main>
          <h2
            className="initialMessage"
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
          <div id="card-container cards">
            {results
              && results.map((result) => (
                <Link
                  to={ `product/${result.id}` }
                  key={ result.id }
                  data-testid="product-detail-link"
                >
                  <Card
                    name={ result.title }
                    img={ result.thumbnail }
                    price={ result.price }
                  />
                </Link>
              ))}
            {noResults && <h3>Nenhum produto foi encontrado</h3>}
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="category">
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
          <div id="productsCategory" className="cards">
            {productsByCategory
              && productsByCategory.map((products) => (
                <Link
                  to={ `product/${products.id}` }
                  key={ products.id }
                  data-testid="product-detail-link"
                >
                  <Card
                    data-testid="product"
                    img={ products.thumbnail }
                    name={ products.title }
                    price={ products.price }
                  />
                </Link>
              ))}
          </div>
        </main>
      </>
    );
  }
}
