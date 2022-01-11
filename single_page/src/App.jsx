import React from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import { SinglePageLayout } from './layouts';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter basename='/checkout'>
      <CheckoutProvider
        applicationState={window.checkout.applicationState}
        initialData={window.checkout.initialData}
        publicOrderId={window.checkout.publicOrderId}
        token={window.checkout.jwtToken}
        storeIdentifier={window.checkout.storeIdentifier}
        apiBase={process.env.API_BASE}
      >
        <SinglePageLayout />
      </CheckoutProvider>
    </BrowserRouter>
  );
};

export default App;
