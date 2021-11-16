import { useCheckoutStatus, useCheckoutStore, usePaymentIframe } from '@boldcommerce/checkout-react-components';
import { Button } from '@boldcommerce/stacks-ui';
import React, { memo } from 'react';

const CheckoutButton = () => {
  const { processPaymentIframe } = usePaymentIframe();
  const { state } = useCheckoutStore();
  const { state: statusState } = useCheckoutStatus();
  const { orderStatus } = state.orderInfo;
  const processing = orderStatus === 'processing' || orderStatus === 'authorizing';

  return (
    <MemoizedCheckoutButton
      onConfirm={processPaymentIframe}
      processing={processing}
      appLoading={statusState.loadingStatus.isLoading}
    />
  );
};

const MemoizedCheckoutButton = memo(({
  onConfirm,
  processing,
  appLoading,
}) => {
  return (
    <Button
      type="button"
      onClick={onConfirm}
      loading={processing}
      disabled={processing || appLoading}
    >
      Confirm order
    </Button>
  );
});

export default CheckoutButton;
