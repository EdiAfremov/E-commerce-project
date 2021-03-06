import React, { Component } from 'react';
import './WelcomePage.css';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, withRouter } from 'react-router-dom';
import Slider from '../../../components/imageSlider/imageSlider'
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';


class welcome extends Component {
  state = {
    suitsImage: '',
    trendsImage: '',
    loading: true
  };
  componentWillMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3001/main'
    }).then(response => {
      this.setState({
        suitsImage: response.data.suits,
        trendsImage: response.data.trends,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div className="welcome-container">
        <Link to="/main/Sale" className="link">
          <div className="welcome-header">
            <h1>UP TO 50% OFF SALE!! </h1>
          </div>
        </Link>
        { this.state.loading ?
          <CircularProgress color={ '#607d8b' } className="spinner" size={ 80 } thickness={ 5 } />
          :
          <div className="welcome-main">
            <div className="new-suits">
              <img src={ this.state.suitsImage } />
              <h3 style={ { marginBottom: '0' } }> NEW SUITS </h3>
              <RaisedButton
                label="SHOP NOW"
                className="new-suits-btn"
                containerElement={
                  <Link
                    className="new-suits-btn link"
                    to={ {
                      pathname: '/main/Clothing',
                      state: { welcomePage: true, type: 'Suit' }
                    } }
                  /> }
              />
            </div>
            <div className="new-trend">
              <img src={ this.state.trendsImage } />
              <h3 style={ { marginBottom: '0' } }> NEW TRENDS </h3>
              <RaisedButton
                label="SHOP NOW"
                className="new-suits-btn"
                containerElement={
                  <Link
                    className="new-suits-btn link"
                    to={ {
                      pathname: '/main/Clothing',
                      state: { welcomePage: true, type: 'mix' }
                    } }
                  /> }
              />

            </div>
          </div> }
        <Slider />
      </div>
    );
  }
}

export default withRouter(welcome);
