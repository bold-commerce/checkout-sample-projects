import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import QuickCheckout from './QuickCheckout/QuickCheckout';
import LoadingSpinner from '@boldcommerce/stacks-ui/lib/components/loadingspinner/LoadingSpinner';

// TODO: replace one click names with quick checkout names
const QuickCheckoutApp = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const initCart = async () => {
    const cart = await Axios.get('/api/storefront/carts');
    let checkout = {}
    
    // big commerce issues customer id of 0 if user is not signed in
    if(cart.data[0].customerId != '0' && cart.data[0].customerId != 0) {
      checkout = await Axios.get(`https://node-sample-checkout.staging.boldapps.net/begin/oneclick/${cart.data[0].id}?customer=${cart.data[0].customerId}&customer_email=${cart.data[0].email}`);
    } else {
      checkout = await Axios.get(`https://node-sample-checkout.staging.boldapps.net/begin/oneclick/${cart.data[0].id}`);
    }
    

    if (checkout && checkout.data && checkout.data.checkout) {
      setData(checkout.data.checkout.data);
    }
  };

  const initCartWithSku = async ({sku, customerEmail, customerId}) => {
    let checkout = {};
    
    // big commerce issues customer id of 0 if user is not signed in
    if(customerId != '0' && customerId != 0) {
      checkout = await Axios.get(`https://node-sample-checkout.staging.boldapps.net/begin/oneclick/sku/${sku}?customer=${customerId}&customer_email=${customerEmail}`);
    } else {
      checkout = await Axios.get(`https://node-sample-checkout.staging.boldapps.net/begin/oneclick/sku/${sku}`);
    }
    
    if (checkout && checkout.data && checkout.data.checkout) {
      setData(checkout.data.checkout.data);
    }
  };

  useEffect(() => {
    document.addEventListener('quickCheckout:open', (e) => {

      if (e?.detail?.sku) {
        initCartWithSku({sku: e.detail.sku, customerEmail: e.detail.customer_email, customerId: e.detail.customer_id});
      } else {
        initCart();
      }

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

  return (
    <div className="bold-oneclick-modal">
      <div className="bold-oneclick-inner">
      <div className="bold-oneclick-header">
        <div className="bold-oneclick-heading">Store name</div>
        <div className="circle-times-close-button" onClick={closeQuickCheckout}>&#8855;</div>
      </div>
        { data ? 
          <CheckoutProvider token={data.jwt_token} publicOrderId={data.public_order_id} applicationState={data.application_state} storeIdentifier={"2d5ces7lbx"} initialData={data.initial_data}>
            <QuickCheckout closeQuickCheckout={closeQuickCheckout} />
          </CheckoutProvider>
          : 
          <div className="bold-oneclick-inner__loading"><LoadingSpinner /></div>
        }
      </div>
    </div>
  );
};

export default QuickCheckoutApp;