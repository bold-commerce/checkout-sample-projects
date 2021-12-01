import { Price } from '@boldcommerce/stacks-ui';
import React from 'react';
import RemoveIcon from './RemoveIcon';

const OrderSummaryItemLine = ({ description, amount, onRemove }) => (
  <div className="OrderSummaryItem__Description">
    { onRemove && (
      <button className="OrderSummaryItem__Action" type="button" onClick={onRemove}><RemoveIcon /></button>
    )}
    <span className="OrderSummaryItem__Label">{description}</span>
    <span className="OrderSummaryItem__Amount">(<Price amount={amount}/>)</span>
  </div>
);

export default OrderSummaryItemLine;
