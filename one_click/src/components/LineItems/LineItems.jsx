/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import LineItem from './LineItem';
import { useLineItems } from '@boldcommerce/checkout-react-components';
import { useVariants } from '../../hooks';

export const LineItems = ({ lineItems }) => {
  const handleVariants = useVariants();
  const lineItemList = lineItems.map((item) => (
    <LineItem
      title={item.product_data.product_title}
      variants={handleVariants(item.product_data.title)}
      image={item.product_data.image_url}
      quantity={item.product_data.quantity}
      totalPrice={item.product_data.total_price}
      key={item.product_data.line_item_key}
    />
  ));

  return lineItemList;
};

LineItems.propTypes = {
  readOnly: PropTypes.bool,
  lineItems: PropTypes.array,
  updateLineItemQuantity: PropTypes.func,
  removeLineItem: PropTypes.func,
};

const MemoizedLineItems = React.memo(LineItems);

const LineItemsContainer = () => {
  const { data: lineItems } = useLineItems();

  return (
    <MemoizedLineItems
      lineItems={lineItems}
    />
  );
};

LineItemsContainer.propTypes = {
  readOnly: PropTypes.bool,
};

export default LineItemsContainer;