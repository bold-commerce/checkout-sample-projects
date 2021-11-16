import React from 'react';
import { Customer } from '../Customer';
import { ShippingAddress } from '../ShippingAddress';
import { OrderErrors } from '../OrderErrors';
import { BillingAddress } from '../BillingAddress';
import { ShippingLines } from '../ShippingLines';
import { OrderSummary } from '../OrderSummary';
import { PaymentMethod } from '../PaymentMethod';
import { CheckoutButton } from '../CheckoutButton';
import './SinglePageLayout.css';

const SinglePageLayout = () => {
  return (
    <div className="Checkout">
      <div className="Checkout__Main">
        <OrderErrors />
        <Customer />
        <ShippingAddress />
        <BillingAddress />
        <ShippingLines />
        <PaymentMethod />
        <CheckoutButton />
      </div>
      <div className="Checkout__Sidebar">
        <OrderSummary readOnly={false} />
      </div>
    </div>
  );
};

export default SinglePageLayout;