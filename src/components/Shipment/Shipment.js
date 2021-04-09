import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser , setLoggedInUser] = useContext(UserContext);
    const [shippingData, setShippingData] = useState(null);

    const onSubmit = data => {
        setShippingData(data);
    };
    
    const handlePaymentSuccess = paymentId => {
      const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products : savedCart , shipment: shippingData, paymentId, orderTime: new Date()};

        fetch('https://still-bayou-67979.herokuapp.com/addOrder', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderDetails)

        })
        .then(res=>res.json())
        .then(data=>{
          if(data){
            processOrder()
            alert('Order Placed Successfully');
          }
        })
    }

  
    return (
      
      <div className="row">
        <div style = {{display:shippingData ? 'none': 'block'}}className="col-md-6">
        <form className = "ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue = {loggedInUser.name} ref={register({ required: true })} placeholder = "Your Name" />  
        {errors.name && <span className = "error">The Name is required</span>}
        <input name="email" defaultValue = {loggedInUser.email} ref={register({ required: true })} placeholder = "Your email"  />  
        {errors.email && <span className = "error">The email is required</span>}
        <input name="address" ref={register({ required: true })} placeholder = "Your address"  />  
        {errors.address && <span className = "error">The address is required</span>}
        <input name="phone" ref={register({ required: true })} placeholder = "Your Phone Number" />  
        {errors.phone && <span className = "error">Phone no is required</span>}
        <input type="submit" />
      </form>
        </div>
        <div style = {{display:shippingData ? 'block': 'none'}} className="col-md-6">
        <h2>Pay for me</h2>
        <ProcessPayment handlePayment = {handlePaymentSuccess}>
          
        </ProcessPayment>
        </div>
      </div>
  
    );
};

export default Shipment;