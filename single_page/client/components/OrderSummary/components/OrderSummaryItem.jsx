import Price from '@boldcommerce/stacks-ui/lib/components/price/Price';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const OrderSummaryItem = ({
  title,
  amount,
  lines,
}) => {
  console.log(lines);

  return (
    <div className={classNames('OrderSummaryItem', lines ? 'OrderSummaryItem--removable' : '')}>
      <span className="OrderSummaryItem__Title">{title}</span>
      { lines ? lines : (
        amount > 0 && <span className="OrderSummaryItem__Amount">(<Price amount={amount}/>)</span>
      )}
    </div>
  );
};

OrderSummaryItem.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  lines: PropTypes.node,
};

export default OrderSummaryItem;
