import React, { Component } from 'react';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './Clothing.css';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import LikeCheckbox from '../../../components/Like/Like'
import update from 'immutability-helper';
import ProductInfo from '../ProductInfo/ProductInfo';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import SortingItems from '../../../components/sortingItems/sortingItems'



let ARR = []
class clothing extends Component {
  state = {
    products: [],
    filters: {
      sortValue: '',
      brandValue: '',
      brandsNames: [],
      sortByItem: '',
      types: [],
    },
    numberOfItems: '',
    likeCliked: false,
    productsLiked: [],
    productCliked: false,
    loading: true,
  };
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3001/clothing'
    }).then(response => {
      let brands = _.uniqBy(response.data.clothes, 'brand');
      let types = _.uniqBy(response.data.clothes, 'type');
      this.setState(prevState => {
        return {
          products: response.data.clothes,
          filters: {
            sortValue: '',
            brandValue: '',
            brandsNames: brands,
            types: types,
          },
          numberOfItems: response.data.count,
          loading: false,
        }
      });
    });
  }

  handleSortChange = (event, index, value) => {

    let sortState = [...this.state.products];
    let sorted;
    switch (value) {
      case 'Price low to high':
        sorted = sortState.sort((a, b) => {
          return a.price - b.price
        })
        break;
      case 'Price high to low':
        sorted = sortState.sort((a, b) => {
          return a.price - b.price
        }).reverse()
        break;
      default:
        break;
    }
    this.setState(prevState => {
      return {
        products: prevState.products = sorted,
        sortValue: prevState.sortValue = value,
        ...prevState,
      }
    })

  };

  brandChangeHandler = (event, index, value) => {
    axios({
      method: 'get',
      url: `http://localhost:3001/clothing/search/${value}`
    }).then(response => {
      console.log(response.data.products.length)
      this.setState(prevState => {
        return {
          products: prevState.products = response.data.products,
          brandValue: prevState.brandValue = value,
          numberOfItems: prevState.numberOfItems = response.data.products.length,
          ...prevState
        }
      })
    });
  };
  typeChangeHandler = (event, index, value) => {


    axios({
      method: 'get',
      url: `http://localhost:3001/clothing/search/type/${value}`
    }).then(response => {

      this.setState(prevState => {
        return {
          products: prevState.products = response.data.products,
          sortByItem: prevState.sortByItem = value,
          numberOfItems: prevState.numberOfItems = response.data.products.length,
          ...prevState
        }
      })
    });
  };


  likedProductsHandler = id => {
    let arr = [...new Set(this.state.productsLiked)];
    this.setState(
      prevState => {
        return {
          ...prevState.products,
          ...prevState.likeCliked,
          productsLiked: (prevState.productsLiked = arr)
        };
      },

    );
  };

  likeHandler = (id, event) => {
    if (event.target.checked) {
      console.log(id._id)
      ARR.push(id._id)
      localStorage.setItem('liked', JSON.stringify(ARR));
      axios({
        method: 'post',
        url: 'http://localhost:3001/likedItems',
        data: { id: id._id }
      }).then(response => {
        console.log(response.data)
      });
      // this.setState(
      //   prevState => {
      //     return {
      //       likeChecked: !prevState.likeChecked,
      //       productsLiked: [...prevState.productsLiked, id]
      //     };
      //   },
      //   () => this.likedProductsHandler()
      // );
    } else {
      let removeProduct = [...this.state.productsLiked];
      for (let i = 0; i < removeProduct.length; i++) {
        const product = removeProduct[i].id;
        if (product == id.id) {
          let index = removeProduct.indexOf(removeProduct[i]);
          this.setState(prevState => {
            return {
              productsLiked: update(prevState.productsLiked, {
                $splice: [[index, 1]]
              })
            };
          });
        }
      }
    }
  };

  render() {

    let likedProducts = 'favorite_border';
    if (this.state.productsLiked.length > 0) {
      for (let i = 0; i < this.state.productsLiked.length; i++) { }
      likedProducts = 'favorite';
    }
    const likeStyle = {
      fill: 'black',
      borderRadius: '50%',
      padding: '4px'
    }
    let productsList = this.state.products;


    const products = Object.keys(productsList).map((product, id) => {


      return (
        <div key={ id } className="product" >
          <Link
            className="link"
            key={ id }
            to={ {
              pathname: `${this.props.match.url}/${
                productsList[product].brand
                }${id}`,
              state: { productID: productsList[product]._id, type: 'clothing' }
            } }
          >
            <img
              src={ productsList[product].image }
              alt={ productsList[product].brand }
            />
            <p className="brand">{ productsList[product].brand }</p>
            <p className="price">{ productsList[product].price }$</p>
          </Link>
          <div className="like-btn">
            <Checkbox
              onClick={ this.likeHandler.bind(this, productsList[product]) }
              iconStyle={ likeStyle }
              inputStyle={ { backgroundColor: 'rgba(255, 255, 255, 0.8)', } }
              style={ { color: 'black' } }
              checkedIcon={ <FontIcon id={ id } style={ { backgroundColor: 'rgba(255, 255, 255, 0.8)', } } className="material-icons" >  favorite </FontIcon> }
              uncheckedIcon={ <FontIcon id={ id } style={ { backgroundColor: 'rgba(255, 255, 255, 0.8)', } } className="material-icons"> favorite_border </FontIcon> }
            />
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="sorting-container" >
          <div className="fields">
            <SelectField
              style={ { width: '180px' } }
              underlineStyle={ { color: 'black' } }
              name="Sort"
              hintText="Sort"
              hintStyle={ { color: 'black' } }
              value={ this.state.sortValue }
              onChange={ this.handleSortChange }
            >
              <MenuItem value={ 'Price high to low' } label="Price high to low" primaryText="Price high to low" />
              <MenuItem value={ "Price low to high" } label="Price low to high" primaryText="Price low to high" />
            </SelectField>
            <SelectField
              style={ { width: '180px' } }
              underlineStyle={ { color: 'black' } }
              name="Brand"
              hintText="Brand"
              hintStyle={ { color: 'black' } }
              value={ this.state.brandValue }
              onChange={ this.brandChangeHandler }
            >
              { this.state.products ? this.state.filters.brandsNames.map((item, i) => {
                return <MenuItem key={ i } value={ item.brand } label={ item.brand } primaryText={ item.brand } />

              }) : null }

            </SelectField>
            <SelectField
              style={ { width: '180px' } }
              underlineStyle={ { color: 'black' } }
              name="Type"
              hintText="Type"
              hintStyle={ { color: 'black' } }
              value={ this.state.sortByItem }
              onChange={ this.typeChangeHandler }
            >
              { this.state.products ? this.state.filters.types.map((item, i) => {
                return <MenuItem key={ i } value={ item.type } label={ item.type } primaryText={ item.type } />

              }) : null }

            </SelectField>

          </div>
        </div>
        { this.state.loading ? '' : <div className='counter'> { this.state.numberOfItems } styles found </div> }
        <div className={ this.state.products.length < 4 ? 'clothing-container center' : 'clothing-container' }>
          { this.state.loading ? <CircularProgress color={ '#607d8b' } className="spinner" size={ 80 } thickness={ 5 } /> : products }
        </div>

      </div>)
  }
}

export default withRouter(clothing);
