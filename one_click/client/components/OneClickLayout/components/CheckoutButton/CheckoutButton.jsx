import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Message,
} from '@boldcommerce/stacks-ui';
import { useCheckoutStore, usePaymentIframe } from '@boldcommerce/checkout-react-components';
import './CheckoutButton.css';

const CheckoutButton = ({ disabled, onClick, loading, className, errorMessage }) => (
  <>
    { errorMessage ? <Message type="alert">{ errorMessage }</Message> : null }
    <Button onClick={onClick} disabled={disabled} loading={loading} className={className}>
      Complete Order
    </Button>
  </>
);

CheckoutButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
};

const CheckoutButtonContainer = ({ className }) => {
  const { state } = useCheckoutStore();
  const { orderStatus } = state.orderInfo;
  const orderErrorMessage = state.errors.order?.public_order_id;

  // don't disable checkout button if only error is order error
  const hasErrors = Object.keys(state.errors).some((errorKey) => errorKey != 'order' && state.errors[errorKey] != null);
  const checkoutButtonDisabled = state.loadingStatus.isLoading || hasErrors;

  const { processPaymentIframe } = usePaymentIframe();
  const processing = orderStatus === 'processing' || orderStatus === 'authorizing';
  const onClick = processing ? null : processPaymentIframe;

  return <CheckoutButton disabled={checkoutButtonDisabled} onClick={onClick} loading={processing} className={className} errorMessage={orderErrorMessage} />;
};

export default CheckoutButtonContainer;
