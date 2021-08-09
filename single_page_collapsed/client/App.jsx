import React from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import { SinglePageCollapsedLayout } from './components';
import '@boldcommerce/checkout-react-components/dist/styles.css'

const App = () => {
  return (
    <CheckoutProvider
      applicationState={window.checkout.applicationState}
      initialData={window.checkout.initialData}
      publicOrderId={window.checkout.publicOrderId}
      token={window.checkout.jwtToken}
      storeIdentifier={window.checkout.storeIdentifier}
    >
      <SinglePageCollapsedLayout />
    </CheckoutProvider>
  );
};

export default App;