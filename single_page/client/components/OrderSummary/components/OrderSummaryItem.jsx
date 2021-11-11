import Price from '@boldcommerce/stacks-ui/lib/components/price/Price';
import React from 'react';
import PropTypes from 'prop-types';

const OrderSummaryItem = ({
  title,
  description,
  amount,
  onRemove,
}) => {
  if (!amount) return null;

  return (
    <div className="OrderSummaryItem">
      <span className="OrderSummaryItem__Title">{title}</span>
      {description ? (
        <div className="OrderSummaryItem__Description">
          <button className="OrderSummaryItem__Action" type="button" onClick={onRemove}>x</button>
          <span className="OrderSummaryItem__Label">{description}</span>
          <span className="OrderSummaryItem__Amount">(<Price amount={amount}/>)</span>
        </div>
      ) : (
        <span className="OrderSummaryItem__Amount"><Price amount={amount}/></span>
      )}
    </div>
  );
};

OrderSummaryItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  amount: PropTypes.number,
  onRemove: PropTypes.func,
};

export default OrderSummaryItem;
