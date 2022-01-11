import { useBillingAddress, useCheckoutStore, useLineItems, usePaymentIframe } from '@boldcommerce/checkout-react-components';
import { useNavigate } from "react-router-dom";
import { Button } from '@boldcommerce/stacks-ui';
import React, { memo, useCallback, useState } from 'react';
import { useAnalytics, useErrorLogging, useInventory } from '../../hooks';

const CheckoutButton = () => {
  const { processPaymentIframe } = usePaymentIframe();
  const { state } = useCheckoutStore();
  const { data: lineItems } = useLineItems();
  const { data: billingAddress } = useBillingAddress();
  const { orderStatus } = state.orderInfo;
  const validateInventory = useInventory();
  const processing = orderStatus === 'processing' || orderStatus === 'authorizing';

  return (
    <MemoizedCheckoutButton
      processOrder={processPaymentIframe}
      validateInventory={validateInventory}
      processing={processing}
      hasBillingAddress={!!billingAddress.country_code}
      lineItems={lineItems}
      appLoading={state.loadingStatus.isLoading}
    />
  );
};

const MemoizedCheckoutButton = memo(({
  processOrder,
  validateInventory,
  processing,
  hasBillingAddress,
  lineItems,
  appLoading,
}) => {
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleProcessPayment = useCallback(async () => {
    trackEvent('click_complete_order');
    setLoading(true);
    try {
      const inventoryIssues = await validateInventory(lineItems);

      if (inventoryIssues) {
        setLoading(false);
        navigate('/inventory_issues', { state: inventoryIssues });
      } else {
        setLoading(false);
        await processOrder();
      }
    } catch(e) {
      logError('process_order', e);
      setLoading(false);
    }
  }, [logError, trackEvent, processOrder, lineItems]);

  return (
    <Button
      type="button"
      className="Checkout__ConfirmButton"
      onClick={handleProcessPayment}
      loading={loading || processing}
      disabled={!hasBillingAddress || processing || appLoading}
    >
      Confirm order
    </Button>
  );
});

export default CheckoutButton;
