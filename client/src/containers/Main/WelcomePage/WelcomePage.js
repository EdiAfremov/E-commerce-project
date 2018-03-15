import React, { Component } from 'react';
import './WelcomePage.css';
import RaisedButton from 'material-ui/RaisedButton';

const imageSuit = require('../../../assets/suits.jpg');
const imageTrend = require('../../../assets/trends.jpg');
class welcome extends Component {
  render() {
    return (
      <div className="welcome-container">
        <div className="welcome-header">
          <h1>UP TO 50% OFF SALE!! </h1>
        </div>
        <div className="welcome-main">
          <div className="new-suits">
            <img src={ imageSuit } />
            <h3 style={ { marginBottom: '0' } }> NEW SUITS </h3>
            <RaisedButton label="SHOP NOW" className="new-suits-btn" />
          </div>
          <div className="new-trend">
            <img src={ imageTrend } />
            <h3 style={ { marginBottom: '0' } }> NEW TRENDS </h3>
            <RaisedButton label="SHOP NOW" className="new-trend-btn" />
          </div>
        </div>
      </div>
    );
  }
}

export default welcome;
