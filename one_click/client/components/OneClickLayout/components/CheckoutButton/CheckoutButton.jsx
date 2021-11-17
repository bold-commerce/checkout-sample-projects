import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Message,
} from '@boldcommerce/stacks-ui';
import { useCheckoutStore, usePaymentIframe, useLineItems } from '@boldcommerce/checkout-react-components';
import './CheckoutButton.css';
import { useInventory } from '../../../../hooks';

const CheckoutButton = ({ disabled, onClick, loading, className, errorMessage }) => (
  <>
    { errorMessage ? <Message type="alert">{ errorMessage }</Message> : null }
    <div className="CheckoutButton__Container">
      <Button onClick={onClick} disabled={disabled} loading={loading} className={className}>
        Complete Order
      </Button>
    </div>
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
  const checkInventory = useInventory();
  const { lineItems } = useLineItems();
  const processing = orderStatus === 'processing' || orderStatus === 'authorizing';
  const handleCheckout = () => {
    checkInventory(lineItems);
    processPaymentIframe();
  };
  const onClick = processing ? null : handleCheckout;

  return <CheckoutButton disabled={checkoutButtonDisabled} onClick={onClick} loading={processing} className={className} errorMessage={orderErrorMessage} />;
};

export default CheckoutButtonContainer;
