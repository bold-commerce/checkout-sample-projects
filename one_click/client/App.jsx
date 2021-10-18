import React from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import { OneClickLayout } from './components';

const App = () => {
  return (
    <CheckoutProvider
      applicationState={window.checkout.applicationState}
      initialData={window.checkout.initialData}
      publicOrderId={window.checkout.publicOrderId}
      token={window.checkout.jwtToken}
      storeIdentifier={window.checkout.storeIdentifier}
      apiBase="https://api.boldcommerce.com/checkout/storefront"
    >
      <OneClickLayout />
    </CheckoutProvider>
  );
};

export default App;
