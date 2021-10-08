import React, { useCallback, useEffect, useState } from 'react';
import { useShippingAddress, useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { useAnalytics, useErrorLogging } from '../../hooks';
import { OrderErrors, Customer, ShippingAddress, BillingAddress, ShippingLines, PaymentMethod, CheckoutButton, OrderSummary } from '../../components';
import classNames from 'classnames';

const IndexPage = () => {
  const { state } = useCheckoutStore();
  const { submitShippingAddress } = useShippingAddress();
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const [loading, setLoading] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const setDefaultAddress = useCallback(async () => {
    setLoading(true);
    try {
      await submitShippingAddress(state.applicationState.customer.saved_addresses[0]);
    } catch(e) {
      logError('shipping_address', e);
      setLoading(false);
    }
    setLoading(false);
  }, [state]);

  useEffect(() => {
    // If customer is logged in with saved addresses, default the shipping address to the first one.
    if (state.applicationState.customer.saved_addresses.length > 0) {
      setDefaultAddress();
    }

    trackEvent('landing_page');
  }, []);

  return (
    <>
      <div className="Checkout__Main" role="main">
        <OrderErrors />
        <Customer />
        <ShippingAddress applicationLoading={loading} />
        <BillingAddress applicationLoading={loading} />
        <ShippingLines applicationLoading={loading} />
        <PaymentMethod applicationLoading={loading} />
        <CheckoutButton />
      </div>
      <div
        className={classNames('Checkout__Sidebar', summaryOpen ? 'Checkout__Sidebar--Open' : 'Checkout__Sidebar--Closed' )}
        role="complementary"
      >
        <OrderSummary readOnly={false} summaryOpen={summaryOpen} onCollapse={() => setSummaryOpen((prevState) => !prevState)} />
      </div>
    </>
  );
};

export default IndexPage;
