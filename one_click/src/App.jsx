import React, {useState} from 'react';
import { CheckoutProvider } from '@boldcommerce/checkout-react-components';
import { OneClickLayout } from './layouts';
import { AppContext } from './context/AppContext';
import { useTranslation } from 'react-i18next';
import './App.css';

const App = () => {
  const { t } = useTranslation();
  const websiteName = t("website_name");

  return (
  <div className="OneClick--Modal">
    <CheckoutProvider
      applicationState={window.checkout.applicationState}
      initialData={window.checkout.initialData}
      publicOrderId={window.checkout.publicOrderId}
      token={window.checkout.jwtToken}
      storeIdentifier={window.checkout.storeIdentifier}
      apiBase="https://api.boldcommerce.com/checkout/storefront"
    >
      <AppContext.Provider value={{websiteName}}>
        <OneClickLayout /> 
      </AppContext.Provider>
    </CheckoutProvider>
    </div>
  );
  
};

export default App;
