import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitForm from './SplitForm';

const stripePromise = loadStripe('pk_test_51Ie42ZAM4j0sq5RLVA8plc7m1uivOzkooo3J7DsatHayyKdClNIla5RxHnOSvHUvSTpNNBaMUrq9gfwcSNBXzMjH00FU1x1pZa');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
          {/* <SplitForm></SplitForm> */}
          <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;