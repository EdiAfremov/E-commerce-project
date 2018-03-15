import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';


import { Route, Link, withRouter, Redirect } from 'react-router-dom';

class header extends Component {
  state = {
    clicked: false,
    notifications: 0
  };
  onTitleClickHandle = () => {
    this.props.history.push('/main');
  };
  render() {
    const styles = {
      title: {
        cursor: 'pointer'
      },
      background: '#2d2d2d'
    };

    let logout;
    if (this.props.logout) {
      logout = (
        <IconButton iconStyle={ { color: '#fff' } } iconClassName="material-icons" tooltip="Logout">
          exit_to_app
        </IconButton>
      );
    }

    return (
      <AppBar
        style={ styles }
        title={ <span onClick={ this.onTitleClickHandle } style={ styles.title }>MyShop</span> }
        showMenuIconButton={ this.props.showMenu }
        iconElementRight={
          <div>
            <Link to="/MyAccount">
              <IconButton iconClassName="material-icons" iconStyle={ { color: '#fff' } } tooltip="My Account">
                { this.props.iconAccount }
              </IconButton>
            </Link>
            <Link to="/cart">
              <IconButton iconClassName="material-icons" iconStyle={ { color: '#fff' } } tooltip="Cart">
                { this.props.icon }
              </IconButton>
            </Link>
            { logout }
          </div>
        }
      />
    );
  }
}

export default withRouter(header);
