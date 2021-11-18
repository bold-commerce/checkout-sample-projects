import React, { useCallback, useEffect, useState } from 'react';
import { Customer } from '../Customer';
import { ShippingAddress } from '../ShippingAddress';
import { OrderErrors } from '../OrderErrors';
import { BillingAddress } from '../BillingAddress';
import { ShippingLines } from '../ShippingLines';
import { OrderSummary } from '../OrderSummary';
import { PaymentMethod } from '../PaymentMethod';
import { CheckoutButton } from '../CheckoutButton';
import { useCheckoutStore, useShippingAddress } from '@boldcommerce/checkout-react-components';
import './SinglePageLayout.css';

const SinglePageLayout = () => {
  const { state } = useCheckoutStore();
  const { submitShippingAddress } = useShippingAddress();
  const [loading, setLoading] = useState(false);

  const setDefaultAddress = useCallback(async () => {
    setLoading(true);
    try {
      await submitShippingAddress(state.applicationState.customer.saved_addresses[0]);
    } catch(e) {
      setLoading(false);
    }
    setLoading(false);
  }, [state]);

  useEffect(() => {
    if (state.applicationState.customer.saved_addresses.length > 0) {
      setDefaultAddress();
    }
  }, []);

  return (
    <div className="Checkout">
      <div className="Checkout__Main">
        <OrderErrors />
        <Customer />
        <ShippingAddress applicationLoading={loading} />
        <BillingAddress applicationLoading={loading} />
        <ShippingLines applicationLoading={loading} />
        <PaymentMethod applicationLoading={loading} />
        <CheckoutButton />
      </div>
      <div className="Checkout__Sidebar">
        <OrderSummary readOnly={false} />
      </div>
    </div>
  );
};

export default SinglePageLayout;