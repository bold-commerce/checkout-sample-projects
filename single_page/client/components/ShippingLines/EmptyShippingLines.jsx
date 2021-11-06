import React from 'react';
import EmptyState from '../EmptyState/EmptyState';

const EmptyShippingLines = () => (
  <div className="FieldSet__Content">
    <EmptyState title="To view shipping options, complete filling in your address" />
  </div>
);

export default EmptyShippingLines;
