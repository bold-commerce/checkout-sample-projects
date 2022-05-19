import React from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import { SinglePageLayout } from './layouts';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter basename='/checkout'>
      <CheckoutProvider
        applicationState={window.initializedOrder.data.application_state}
        initialData={window.initializedOrder.data.initial_data}
        publicOrderId={window.initializedOrder.data.public_order_id}
        token={window.initializedOrder.data.jwt_token}
        storeIdentifier={window.shopIdentifier}
        apiBase={'https://api.boldcommerce.com/checkout/storefront'}
      >
        <SinglePageLayout />
      </CheckoutProvider>
    </BrowserRouter>
  );
};

export default App;
