import { useCheckoutStore, usePaymentIframe } from '@boldcommerce/checkout-react-components';
import { Button } from '@boldcommerce/stacks-ui';
import React, { memo, useCallback } from 'react';
import { useAnalytics, useErrorLogging } from '../../hooks';
import './CheckoutButton.css';

const CheckoutButton = () => {
  const { processPaymentIframe } = usePaymentIframe();
  const { state } = useCheckoutStore();
  const { orderStatus } = state.orderInfo;
  const processing = orderStatus === 'processing' || orderStatus === 'authorizing';

  return (
    <MemoizedCheckoutButton
      onConfirm={processPaymentIframe}
      processing={processing}
      appLoading={state.loadingStatus.isLoading}
    />
  );
};

const MemoizedCheckoutButton = memo(({
  onConfirm,
  processing,
  appLoading,
}) => {
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();

  const handleProcessPayment = useCallback(async () => {
    trackEvent('click_complete_order');
    try {
      await onConfirm();
    } catch(e) {
      logError('process_order', e);
    }
  }, [logError, trackEvent, onConfirm]);

  return (
    <Button
      type="button"
      className="Checkout__ConfirmButton"
      onClick={handleProcessPayment}
      loading={processing}
      disabled={processing || appLoading}
    >
      Confirm order
    </Button>
  );
});

export default CheckoutButton;
