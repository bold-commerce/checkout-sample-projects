import { Message } from '@boldcommerce/stacks-ui';
import React from 'react';
import { useErrors } from '@boldcommerce/checkout-react-components';

const OrderErrors = () => {
  const { data } = useErrors();

  if (data.order && data.order.length > 0) {
    return (
      <Message type="alert">{ data.order[0].message }</Message>
    );
  } else {
    return null;
  }
};

export default OrderErrors;
