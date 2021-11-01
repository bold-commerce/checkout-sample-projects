import React from 'react';
import { Customer } from '../Customer';
import { ShippingAddress } from '../ShippingAddress';
import { OrderErrors } from '../OrderErrors';
import { BillingAddress } from '../BillingAddress';
import './SinglePageLayout.css';

const SinglePageLayout = () => {
  return (
    <div className="Checkout">
      <div className="Checkout__Main">
        <OrderErrors />
        <Customer />
        <ShippingAddress />
        <BillingAddress />
      </div>
    </div>
  );
};

export default SinglePageLayout;