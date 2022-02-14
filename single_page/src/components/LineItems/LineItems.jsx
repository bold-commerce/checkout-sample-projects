import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useLineItems } from '@boldcommerce/checkout-react-components';
import { LineItem } from './components';
import { useVariants } from '../../hooks';

const LineItems = () => {
  const { data: lineItems } = useLineItems();

  return (
    <MemoizedLineItems
      lineItems={lineItems}
    />
  );
};

const MemoizedLineItems = memo(({
  lineItems
}) => {
  const handleVariants = useVariants();

  const lineItemList = lineItems.map((item) => (
    <LineItem
      title={item.product_data.product_title}
      variants={handleVariants(item.product_data.title)}
      image={item.product_data.image_url}
      quantity={item.product_data.quantity}
      price={item.product_data.price}
      totalPrice={item.product_data.total_price}
      key={item.product_data.line_item_key}
    />
  ));

  return (
    <div className="CartItem__List">
      {lineItemList}
    </div>
  );
});

LineItems.propTypes = {
  lineItems: PropTypes.array,
};

export default LineItems;
