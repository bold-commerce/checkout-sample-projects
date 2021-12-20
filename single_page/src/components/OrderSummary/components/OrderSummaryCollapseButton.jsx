import React from 'react';
import { useLineItems, useBreakdown } from '@boldcommerce/checkout-react-components';
import { Price } from '@boldcommerce/stacks-ui';
import ChevronIcon from './ChevronIcon';

const OrderSummaryCollapseButton = ({ onClick, summaryOpen }) => {
  const { data: lineItems } = useLineItems();
  const { data } = useBreakdown();
  const itemCount = lineItems.reduce((prev, curr) => prev + curr.product_data.quantity, 0);
  const {
    total,
  } = data;

  const itemCountText = itemCount > 1 ? `(${itemCount} items)` : `(${itemCount} item)`;

  return (
    <button type="button" className="CollapseButton" onClick={onClick} aria-controls="OrderSummary">
      <span className="CollapseButton__title">
        <ChevronIcon />
        View order summary
      </span>
      <span className="CollapseButton__description">
        {itemCountText}
        <Price amount={total} />
      </span>
    </button>
  );
};

export default OrderSummaryCollapseButton;
