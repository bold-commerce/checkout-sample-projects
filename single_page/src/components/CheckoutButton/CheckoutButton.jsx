import { useBillingAddress, useCheckoutStore, usePaymentIframe } from '@boldcommerce/checkout-react-components';
import {
  useNavigate,
} from "react-router-dom";
import { Button } from '@boldcommerce/stacks-ui';
import React, { memo, useCallback, useState } from 'react';
import { useAnalytics, useErrorLogging } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { useInventory } from '../../hooks';
import { isEmpty } from '../../../utils';

const CheckoutButton = () => {
  const { processPaymentIframe } = usePaymentIframe();
  const { state } = useCheckoutStore();
  const validateInventory = useInventory();
  const { data: billingAddress } = useBillingAddress();
  const { orderStatus } = state.orderInfo;
  const processing = orderStatus === 'processing' || orderStatus === 'authorizing';

  return (
    <MemoizedCheckoutButton
      processOrder={processPaymentIframe}
      processing={processing}
      hasBillingAddress={!!billingAddress.country_code}
      validateInventory={validateInventory}
      appLoading={state.loadingStatus.isLoading}
    />
  );
};

const MemoizedCheckoutButton = memo(({
  processOrder,
  processing,
  hasBillingAddress,
  validateInventory,
  appLoading,
}) => {
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleProcessPayment = useCallback(async () => {
    trackEvent('click_complete_order');
    setLoading(true);
    try {
      const inventoryIssues = await validateInventory();
      if (inventoryIssues) {
        setLoading(false);
        if(!isEmpty(inventoryIssues)){
          navigate('/inventory_issues', { state: inventoryIssues });
        }
      } else {
        setLoading(false);
        await processOrder();
      }
    } catch(e) {
      logError('process_order', e);
      setLoading(false);
    }
  }, [logError, trackEvent, processOrder, validateInventory]);

  return (
    <Button
      type="button"
      className="Checkout__ConfirmButton"
      onClick={handleProcessPayment}
      loading={loading || processing}
      disabled={!hasBillingAddress || processing || appLoading}
    >
      {t('confirm_order')}
    </Button>
  );
});

export default CheckoutButton;
