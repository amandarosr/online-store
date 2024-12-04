import React, { Component } from 'react'
import "../style/SideMenu.css";
import Categories from "../components/Categories";
import xIcon from "../images/close.png";

export default class SideMenu extends Component {
  render() {
    const { closeNav, categoryList, clickCategoryForProducts,
        openNav } = this.props;
    return (
      <div>
        {openNav && (
            <div className="sideNav">
              <button className="navCloseBtn" onClick={closeNav}>
                <img src={xIcon} alt="xIcon" id="xIcon" />
              </button>
              {categoryList.length && (
                <div className="category">
                  {categoryList &&
                    categoryList.map((products) => (
                      <Categories
                        categoryProducts={() =>
                          clickCategoryForProducts(products.id)
                        }
                        key={products.id}
                        name={products.name}
                        value={products.name}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
      </div>
    )
  }
}
