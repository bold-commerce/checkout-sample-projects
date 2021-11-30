import { PaymentIframe } from '@boldcommerce/checkout-react-components';
import React from 'react';
import { BillingAddress, CheckoutButton, DiscountForm } from '..';
import { CheckoutStep } from '../CheckoutStep';

const Billing = () => {
  return (
    <CheckoutStep
      className="CheckoutStep--Billing"
      title="3. Billing"
    >
      <PaymentIframe />
      <DiscountForm />
      <BillingAddress />
      <CheckoutButton />
    </CheckoutStep>
  );
};

export default Billing;
