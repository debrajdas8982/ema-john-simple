import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product);
    const {img ,name, seller,price,stock, key} = props.product;
    return (
        <div className = "product">
            <div>
            <img src= {img} alt=""/>
            </div>
            <div>
            <h4 className= "product-name"><Link to={"/product/" + key}>{name}</Link></h4>
            <br/>
            <p className= "product-name"> <small>by: {seller} </small></p>
            <p className = "product-name">${price}</p>
            <br/>
            <p className = "product-name"><small>Only {stock} left in stock - Order soon</small></p>
           { props.showAddToCart && <button className = "main-button btn-success product-name"
                onClick = { ()=> props.handelAddProduct(props.product)}>
                <FontAwesomeIcon icon={faShoppingCart} />
                Add to cart</button>}
            </div>
            
        </div>
    );
};

export default Product;