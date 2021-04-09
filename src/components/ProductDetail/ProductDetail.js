import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});

    // useEffect(()=>{
    //     fetch('http://localhost:5000/product/' + productKey)
    //     .then(res => res.json())
    //     .then(data=> setProduct(data));
    // }, [productKey])

    useEffect(()=>{
        fetch('https://still-bayou-67979.herokuapp.com/product/' + productKey)
        .then(res=>res.json())
        .then(data=> setProduct(data))
    }, [productKey])

    // const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);
    return (
        <div>
            {/* <h3>{productKey} Product Detail Coming soon</h3> */}
            <Product showAddtoCart = {false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;