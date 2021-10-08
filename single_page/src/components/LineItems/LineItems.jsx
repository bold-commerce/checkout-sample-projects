import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLineItems } from '@boldcommerce/checkout-react-components';
import { LineItem } from './components';
import { useErrorLogging } from '../../hooks';
import { debounce } from '../../helpers/debounce';
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
  const logError = useErrorLogging();

  const handleUpdate = useCallback(async (lineItemKey, value) => {
    try {
      await onUpdate(lineItemKey, value);
    } catch(e) {
      logError('line_items', e);
    }
  }, []);

  const debouncedUpdate = useMemo(() => debounce(handleUpdate, 300), [handleUpdate]);

  const handleRemove = useCallback(async (lineItemKey) => {
    try {
      await onRemove(lineItemKey);
    } catch(e) {
      logError('line_items', e);
    }
  });

  const lineItemList = lineItems.map((item) => (
    <LineItem
      title={item.product_data.title}
      image={item.product_data.image_url}
      quantity={item.product_data.quantity}
      price={item.product_data.price}
      totalPrice={item.product_data.total_price}
      lineItemKey={item.product_data.line_item_key}
      onChange={(lineItemKey, value) => debouncedUpdate(lineItemKey, value)}
      onRemove={(lineItemKey) => handleRemove(lineItemKey)}
      readOnly={readOnly}
      key={item.product_data.line_item_key}
    />
  ));

  return (
    <div className="LineItemList">
      {lineItemList}
    </div>
  );
});

LineItems.propTypes = {
  readOnly: PropTypes.bool,
};

export default LineItems;
