import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useLineItems } from '@boldcommerce/checkout-react-components';
import { LineItem } from './components';
import './LineItems.css';

const LineItems = ({ readOnly = false }) => {
  const { data, updateLineItemQuantity, removeLineItem } = useLineItems();

  return (
    <MemoizedLineItems
      lineItems={data}
      onUpdate={updateLineItemQuantity}
      onRemove={removeLineItem}
      readOnly={readOnly}
    />
  );
};

const MemoizedLineItems = memo(({
  lineItems,
  onUpdate,
  onRemove,
  readOnly,
}) => {
  const lineItemList = lineItems.map((item) => (
    <LineItem
      title={item.product_data.title}
      image={item.product_data.image_url}
      quantity={item.product_data.quantity}
      price={item.product_data.price}
      totalPrice={item.product_data.total_price}
      lineItemKey={item.product_data.line_item_key}
      onChange={(lineItemKey, value) => onUpdate(lineItemKey, value)}
      onRemove={(lineItemKey) => onRemove(lineItemKey)}
      readOnly={readOnly}
      key={item.product_data.line_item_key}
    />
  ));

  return lineItemList;
});

LineItems.propTypes = {
  readOnly: PropTypes.bool,
};

export default LineItems;
