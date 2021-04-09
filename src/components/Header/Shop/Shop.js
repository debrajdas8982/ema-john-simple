import React, { useEffect, useState } from 'react';
// import fakeData from '../../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
   
//    const first10 = fakeData.slice(0,10);
   const [products, setProducts] = useState([]);
   const [cart , setCart] = useState ([]);
   const [search, setSearch] = useState('');
   useEffect(()=>{

       fetch('http://localhost:4000/products?search =' +search)
    //    fetch('https://still-bayou-67979.herokuapp.com/products')
       .then(res=>res.json())
       .then(data=>setProducts(data))
   }, [search])

//    useEffect(()=>{
//     fetch('http://localhost:5000/products')
//     .then(res =>res.json())
//     .then(data => setProducts(data))
//    }, [])


   useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch('https://still-bayou-67979.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(productKeys)
        })
        .then(response =>response.json())
        .then(data=>setCart(data))


        // console.log(products, productKeys);
        // if(products.length >0){
        //     const previousCart = productKeys.map(existingKey =>{
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = savedCart[existingKey];
        //         return product;
        //     })
        //     setCart(previousCart);
        // }
    }, [])


    const handleSearch = event =>{
        setSearch(event.target.value);
    }

   const handelAddProduct = (product) =>{
       const toBeAddedKey = product.key;
    // console.log('product added', product)
    const sameProduct = cart.find(pd=> pd.key ===toBeAddedKey);
    let count = 1;
    let newCart;
    if(sameProduct){
        const count = sameProduct.quantity + 1;
        sameProduct.quantity = count ;
        const others = cart.filter(pd=> pd.key !== toBeAddedKey )
        newCart = [...others, sameProduct];
    }
    else{
        product.quantity = 1;
        newCart = [...cart, product];
    }

    setCart(newCart);
    
    addToDatabaseCart(product.key, count);
   }

    return (
        <div className= "twin-container">
            <div className="product-container">
            <input type="text" onBlur={handleSearch} className="product-search"/>
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart = {true}
                        handelAddProduct = {handelAddProduct}
                        product ={pd}>
                        </Product>)
                }
        
            </div>
           <div className="cart-container">
               <Cart cart = {cart}></Cart>
               <Link to="/review">
                  <button className= "main-button">Review Order</button>
                </Link>

           </div>
        </div>
    );
};

export default Shop;