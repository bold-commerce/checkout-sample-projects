import React from 'react';
import { LineItemQuantity } from '.';
import ArrowRightIcon from './ArrowRightIcon';
import { useTranslation } from 'react-i18next';

const LineItemInventoryAdjustment = ({ originalQuantity, quantity, readOnly }) => {
  const { t } = useTranslation();
  if (quantity === 0) {
    return (
      <div className="LineItem__QuantityAdjustmentWrapper">
        <span className="LineItem__SoldOut">{t('line_item.sold_out')}</span>
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
