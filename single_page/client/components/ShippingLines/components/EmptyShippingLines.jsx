import React from 'react';
import { EmptyState } from '../../EmptyState';

const EmptyShippingLines = ({ content }) => (
  <div className="FieldSet__Content">
    <EmptyState title={content} />
  </div>
);

export default EmptyShippingLines;
