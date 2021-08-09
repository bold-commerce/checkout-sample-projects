import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import QuickCheckout from './components/QuickCheckoutLayout/QuickCheckoutLayout';
import LoadingSpinner from '@boldcommerce/stacks-ui/lib/components/loadingspinner/LoadingSpinner';

const App = () => {
  console.log('hello');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const initCart = async (e) => {
    const sku = e.detail.sku;

    const checkoutData = await Axios.get(`/init?sku=${sku}`);
    if (checkoutData && checkoutData.data) {
      setData(checkoutData.data);
    }
  };

  useEffect(() => {
    document.addEventListener('quickCheckout:open', (e) => {
      initCart(e);
      setOpen(true);
    });

    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'unset';
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setData(null);
    }
  },[open]);

  const closeQuickCheckout = useCallback(() => setOpen(false));

  if (!open) return null;

  console.log({
    token: data?.jwt_token,
    publicOrderId: data?.public_order_id,
    applicationState: data?.application_state,
    storeIdentifier: data?.store_identifier,
    initialData: data?.initial_data,
  });

  return (
    <div className="bold-oneclick-modal">
      <div className="bold-oneclick-inner">
      <div className="bold-oneclick-header">
        <div className="bold-oneclick-heading">Store name</div>
        <div className="circle-times-close-button" onClick={closeQuickCheckout}>&#8855;</div>
      </div>
        { data ? 
          <CheckoutProvider token={data.jwt_token} publicOrderId={data.public_order_id} applicationState={data.application_state} storeIdentifier={data.store_identifier} initialData={data.initial_data}>
            <QuickCheckout closeQuickCheckout={closeQuickCheckout} />
          </CheckoutProvider>
          : 
          <div className="bold-oneclick-inner__loading"><LoadingSpinner /></div>
        }
      </div>
    </div>
  );
};

export default App;