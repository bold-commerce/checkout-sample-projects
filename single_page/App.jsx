import React from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import SinglePage from './SinglePage/SinglePage';
import '@boldcommerce/checkout-react-components/dist/styles.css'

const App = () => {
  return (
    <CheckoutProvider
      applicationState={}
      initialData={}
      publicOrderId=""
      token=""
      storeIdentifier=""
    >
      <SinglePage />
    </CheckoutProvider>
  );
};

export default App;