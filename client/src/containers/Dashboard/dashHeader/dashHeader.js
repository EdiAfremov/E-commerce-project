import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Dashboard from './../Dashboard';
import { Route, Link, withRouter, Redirect } from 'react-router-dom';
class dashHeader extends Component {

    onTitleClickHandle = () => {
        this.props.history.push('/main');
    };

    render() {
        const styles = {
            title: {
                cursor: 'pointer'
            },
            background: '#2d2d2d',
            zIndex: 999,

        };
        return (
            <AppBar
                onLeftIconButtonClick={ this.props.sideBar.bind(this) }
                showMenuIconButton={ true }
                style={ styles }
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                title={ <span onClick={ this.onTitleClickHandle } style={ styles.title }>App Dashboard</span> }
            />

        );
    }
}

export default withRouter(dashHeader);


