import { useBillingAddress, useCheckoutStore, useLineItems, usePaymentIframe } from '@boldcommerce/checkout-react-components';
import { Button } from '@boldcommerce/stacks-ui';
import React, { memo, useCallback, useState } from 'react';
import { useAnalytics, useErrorLogging } from '../../hooks';
import { useTranslation } from 'react-i18next';

const CheckoutButton = () => {
  const { processPaymentIframe } = usePaymentIframe();
  const { state } = useCheckoutStore();
  const { data: billingAddress } = useBillingAddress();
  const { orderStatus } = state.orderInfo;
  const processing = orderStatus === 'processing' || orderStatus === 'authorizing';

  return (
    <MemoizedCheckoutButton
      processOrder={processPaymentIframe}
      processing={processing}
      hasBillingAddress={!!billingAddress.country_code}
      appLoading={state.loadingStatus.isLoading}
    />
  );
};

const MemoizedCheckoutButton = memo(({
  processOrder,
  processing,
  hasBillingAddress,
  appLoading,
}) => {
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleProcessPayment = useCallback(async () => {
    trackEvent('click_complete_order');
    setLoading(true);
    try {
      await processOrder();
    } catch(e) {
      console.log({ e });
    }
    // try {
    //   const inventoryIssues = await validateInventory();
    //   if (inventoryIssues) {
    //     setLoading(false);
    //     navigate('/inventory_issues', { state: inventoryIssues });
    //   } else {
    //     setLoading(false);
    //     await processOrder();
    //   }
    // } catch(e) {
    //   logError('process_order', e);
    //   setLoading(false);
    // }
    setLoading(false);
  }, [logError, trackEvent, processOrder]);

  return (
    <Button
      type="button"
      className="Checkout__ConfirmButton"
      onClick={handleProcessPayment}
      loading={loading || processing}
      disabled={!hasBillingAddress || processing || appLoading}
    >
      {t('complete_order')}
    </Button>
  );
});

export default CheckoutButton;
