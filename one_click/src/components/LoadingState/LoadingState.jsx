import React from 'react';
import './LoadingState.css';
import LoadingSpinner from '@boldcommerce/stacks-ui/lib/components/loadingspinner/LoadingSpinner';

const LoadingState = () => (
  <div className="FieldSet--LoadingState">
    <LoadingSpinner />
  </div>
);

export default LoadingState;
