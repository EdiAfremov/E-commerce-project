import React, { Component } from 'react';
import './sortingItems.css'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



class sortingItems extends Component {
    state = {
        value: '',
    };

    // handleChange = (event, index, value) => this.setState({ value });


    render() {


        return (
            <div className="sorting-container">
                { this.props.value }
            </div>
        );
    }
}

export default sortingItems;