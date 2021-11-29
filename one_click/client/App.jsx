import React, {useState} from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import { OneClickLayout } from './components';
import { AppContext } from './components/OneClickLayout/context/AppContext';

const App = () => {
  const websiteName = "websitename";
  const [showCheckout, setShowCheckout] = useState(true);

  return !showCheckout ? null : (
    <CheckoutProvider
      applicationState={window.checkout.applicationState}
      initialData={window.checkout.initialData}
      publicOrderId={window.checkout.publicOrderId}
      token={window.checkout.jwtToken}
      storeIdentifier={window.checkout.storeIdentifier}
      apiBase="https://api.boldcommerce.com/checkout/storefront"
    >
      <AppContext.Provider value={{websiteName, setShowCheckout}}>
        <OneClickLayout /> 
      </AppContext.Provider>
    </CheckoutProvider>
  );
  
};

export default App;
