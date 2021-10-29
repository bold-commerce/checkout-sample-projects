import React, { useCallback, useState } from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import { OneClickLayout } from './components';

const App = () => {
  const handleError = useCallback((error) => {
    // Add custom error handling
    console.log(error.message);
  }, []);

  return (
    <CheckoutProvider
      applicationState={window.checkout.applicationState}
      initialData={window.checkout.initialData}
      publicOrderId={window.checkout.publicOrderId}
      token={window.checkout.jwtToken}
      storeIdentifier={window.checkout.storeIdentifier}
      apiBase="https://api.boldcommerce.com/checkout/storefront"
      onError={handleError}
    >
      <OneClickLayout />
    </CheckoutProvider>
  );
};

export default App;
