import React from 'react';
import { LineItemQuantity } from '.';
import ArrowRightIcon from './ArrowRightIcon';

const LineItemInventoryAdjustment = ({ originalQuantity, quantity, readOnly }) => {
  if (quantity === 0) {
    return (
      <div className="LineItem__QuantityAdjustmentWrapper">
        <span className="LineItem__SoldOut">Sold out</span>
      </div>
    );
  } else {
    return (
      <div className="LineItem__QuantityAdjustmentWrapper">
        <LineItemQuantity
          readOnly={readOnly}
          defaultValue={originalQuantity}
        />
        <ArrowRightIcon />
        <LineItemQuantity
          readOnly={readOnly}
          defaultValue={quantity}
        />
      </div>
    )
  }
};

export default LineItemInventoryAdjustment;
