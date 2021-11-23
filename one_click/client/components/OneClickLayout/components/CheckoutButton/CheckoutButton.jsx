import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router';
import {
  Button,
  Message,
} from '@boldcommerce/stacks-ui';
import { useCheckoutStore, usePaymentIframe, useLineItems } from '@boldcommerce/checkout-react-components';
import { useInventory } from '../../../../hooks';
import './CheckoutButton.css';

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
  const [loading, setLoading] = useState();
  const location = useLocation();
  const { orderStatus } = state.orderInfo;
  const { processPaymentIframe } = usePaymentIframe();
  const checkInventory = useInventory();
  const { data: lineItems } = useLineItems();
  const history = useHistory();

  const orderErrorMessage = state.errors.order?.public_order_id;

  // Don't show the checkout button on the inventory issues page
  const inventoryLocation = location.pathname === '/inventory';

  // don't disable checkout button if only error is order error
  const hasErrors = Object.keys(state.errors).some((errorKey) => errorKey != 'order' && state.errors[errorKey] != null);
  const missingAddress = Object.values(state.applicationState.addresses).some(x => x === null || x.length === 0);
  const checkoutButtonDisabled = state.loadingStatus.isLoading || hasErrors ||  missingAddress;
  const processing = orderStatus === 'processing' || orderStatus === 'authorizing';
  const handleCheckout = async() => {
    setLoading(true);
    try {
      const inventoryIssues = await checkInventory(lineItems);
      if (!inventoryIssues) {
        await processPaymentIframe();
        setLoading(false);
      } else {
        setLoading(false);
        history.push('/inventory', inventoryIssues);
      }
    } catch(e) {  
      setLoading(false);
    }
  };
  const onClick = processing ? null : handleCheckout;

  return inventoryLocation ? null : <CheckoutButton disabled={checkoutButtonDisabled} onClick={onClick} loading={processing || loading} className={className} errorMessage={orderErrorMessage} />;
};

export default CheckoutButtonContainer;
