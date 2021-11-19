import { Message } from '@boldcommerce/stacks-ui';
import React, { useEffect } from 'react';
import { useErrors } from '@boldcommerce/checkout-react-components';

const OrderErrors = () => {
  const { data } = useErrors();

  // Scroll to top of the page if a new error happened
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [data?.order]);

  if (data.order && data.order.length > 0) {
    return (
      <Message type="alert">{ data.order[0].message }</Message>
    );
  } else {
    return null;
  }
};

export default OrderErrors;
