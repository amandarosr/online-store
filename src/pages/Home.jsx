import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Card from "../components/Card";
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from "../services/api";

export default class Home extends Component {
  state = {
    categoryList: [],
    inputValue: "",
    results: [],
    noResults: false,
    openNav: false,
  };

  componentDidMount() {
    this.fetchCategoryList();
    this.clickCategoryForProducts("MLB1039");
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  clickToOpenNav = () => this.setState({ openNav: true });

  closeNav = () => this.setState({ openNav: false });

  fetchCategoryList = async () => {
    this.setState({ loading: true });
    const categories = await getCategories();
    this.setState({ categoryList: categories });
  };

  clickForProducts = async () => {
    const { inputValue } = this.state;
    const apiProducts = await getProductsFromCategoryAndQuery("", inputValue);
    const data = apiProducts.results;
    this.setState({
      results: data,
      noResults: false,
    });
    if (data.length === 0) {
      this.setState({
        noResults: true,
      });
    }
  };

  clickCategoryForProducts = async (categoryId) => {
    const products = await getProductsFromCategoryAndQuery(categoryId);
    this.setState({
      results: products.results,
      noResults: false,
      openNav: false,
    });
    if (products.results.length === 0) {
      this.setState({
        noResults: true,
      });
    }
  };

  render() {
    const { categoryList, inputValue, results, noResults, openNav } =
      this.state;
    return (
      <>
        <Header
          clickForProducts={this.clickForProducts}
          inputValue={inputValue}
          onInputChange={this.handleChange}
          clickToOpenNav={this.clickToOpenNav}
        />
        <main>
          <SideMenu
            closeNav={this.closeNav}
            categoryList={categoryList}
            clickCategoryForProducts={this.clickCategoryForProducts}
            openNav={openNav}
          />
          <div id="card-container" className="cards">
            {noResults && <h3>Nenhum produto foi encontrado</h3>}
            {results &&
              results.map((result) => (
                <Link
                  to={`product/${result.id}`}
                  key={result.id}
                  data-testid="product-detail-link"
                  className="cardLink"
                >
                  <Card
                    name={result.title}
                    img={result.thumbnail}
                    price={result.price}
                  />
                </Link>
              ))}
          </div>
        </main>
        <footer>
          <p>© 2024 fake•store. All Rights Reserved</p>
        </footer>
      </>
    );
  }
}
