import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Login from '../Login/Login';
import SubHeader from '../../components/Subheader/Subheader';
import Clothing from './Clothing/Clothing';
import Shoes from './Shoes/Shoes';
import Sale from './Sale/Sale';
import Accessories from './Accessories/Accessories';
import Welcome from './WelcomePage/WelcomePage';
import ProductInfo from './ProductInfo/ProductInfo';
import Cart from '.././Cart/Cart';
import axios from 'axios';
import './Main.css';
import { Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';

class main extends Component {
  state = {
    loggedIn: true,
    itemsIntheBagIcon: 0
  };
  // componentDidMount() {
  //   this.loggedInCheck(this.props.location.state.loggedIn);
  // }
  loggedInCheck = val => {
    this.setState(prevState => {
      return { loggedIn: true };
    }, console.log(this.state, val));
  };
  getBagItems(val) {
    axios({
      method: 'get',
      url: 'http://localhost:3001/bag/updateBagIcon',
    }).then(response => {
      console.log(response.data)
      this.setState({
        itemsIntheBagIcon: response.data
      })
    })

  }

  render() {
    let reLogin;
    if (!this.state.loggedIn || this.state.loggedIn == undefined) {
      reLogin = <Redirect to="/" />;
    }

    return (
      <div className="main">
        <Header icon={ 'shopping_cart' } logout={ true } BagIcon={ this.state.itemsIntheBagIcon } iconAccount="account_box" />
        <SubHeader />
        <div className="main-conatainer">
          { reLogin }
          <Switch>
            <Route
              exact
              path={ this.props.match.url + '/' }
              component={ Welcome }
            />
            <Route
              exact
              path={ this.props.match.url + '/Clothing/:product' }
              render={ () => <ProductInfo product={ this.getBagItems.bind(this) } /> }
            />
            <Route
              path={ `${this.props.match.url}/Clothing` }
              component={ Clothing }
            />
            <Route
              exact
              path={ this.props.match.url + '/Shoes/:shoe' }
              component={ ProductInfo }
            />
            <Route path={ `${this.props.match.url}/Shoes` } component={ Shoes } />

            <Route
              exact
              path={ this.props.match.url + '/Sale/:type' }
              component={ ProductInfo }
            />
            <Route path={ `${this.props.match.url}/Sale` } component={ Sale } />
            <Route
              path={ `${this.props.match.url}/Accessories` }
              component={ Accessories }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(main);
