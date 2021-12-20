import React from 'react';
import { LoadingSpinner } from '@boldcommerce/stacks-ui';
import './ProcessingPage.css';

const ProcessingPage = () => {
  return (
    <div className="Checkout__Processing">
      <LoadingSpinner />
      <h1>Processing order...</h1>
      <p>This may take a few moments. Please remain on the page until the process is complete.</p>
    </div>
  );
};

export default ProcessingPage;
