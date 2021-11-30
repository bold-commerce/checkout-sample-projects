import React from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import { MemoryRouter } from 'react-router-dom';
import { QuickCheckoutLayout } from './layouts';

const App = () => {
  return (
    <MemoryRouter>
      <CheckoutProvider
        applicationState={window.checkout.applicationState}
        initialData={window.checkout.initialData}
        publicOrderId={window.checkout.publicOrderId}
        token={window.checkout.jwtToken}
        storeIdentifier={window.checkout.storeIdentifier}
        apiBase="https://api.boldcommerce.com/checkout/storefront"
      >
        <QuickCheckoutLayout />
      </CheckoutProvider>
    </MemoryRouter>
  );
};

export default App;
