import React, { Component } from 'react';
import './Subheader.css';

import { withRouter, Link, Route } from 'react-router-dom';
import Clothing from './../../containers/Main/Clothing/Clothing';
const navItems = ['Clothing', 'Shoes', 'Accessories', 'Sale'];

class subheader extends Component {
  render() {
    let listItems = navItems.map(item => {
      return (
        <Link
          className={item === 'Sale' ? 'item sale' : 'item'}
          key={item}
          to={this.props.match.url + '/' + item}
        >
          <div key={item}>{item}</div>
        </Link>
      );
    });

    return (
      <div className="subheader-container">
        <div className="subheader-nav">{listItems}</div>
      </div>
    );
  }
}
//
export default withRouter(subheader);
