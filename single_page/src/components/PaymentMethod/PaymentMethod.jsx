import { useBillingAddress, useBillingSameAsShipping, useCheckoutStore, usePaymentIframe, useShippingAddress, useShippingLines } from '@boldcommerce/checkout-react-components';
import React, { memo, useEffect, useState } from 'react';
import { CheckoutSection } from '../CheckoutSection';
import { EmptyState } from '../EmptyState';
import { LoadingState } from '../LoadingState';
import './PaymentMethod.css';
import { useTranslation } from 'react-i18next';

const PaymentMethod = ({ applicationLoading }) => {
  const { state } = useCheckoutStore();
  const { data: shippingAddress } = useShippingAddress();
  const { data: billingAddress } = useBillingAddress();
  const { data: billingSameAsShipping } = useBillingSameAsShipping();
  const { data: paymentIframe, loadingStatus, paymentIframeOnLoaded } = usePaymentIframe();
  const { data } = useShippingLines();
  const shippingLines = data.shippingLines;
  const orderStatus = state.orderInfo.orderStatus;
  const loading = (loadingStatus !== 'fulfilled' && orderStatus !== 'authorizing') || applicationLoading;

  return <MemoizedPaymentMethod
    billingAddress={billingAddress}
    shippingAddress={shippingAddress}
    shippingLines={shippingLines}
    billingSameAsShipping={billingSameAsShipping}
    paymentIframeUrl={paymentIframe.url}
    paymentIframeHeight={paymentIframe.height}
    onPaymentIframeLoaded={paymentIframeOnLoaded}
    loading={loading}
  />;
};

const MemoizedPaymentMethod = memo(({
  billingAddress,
  shippingAddress,
  shippingLines,
  billingSameAsShipping,
  paymentIframeUrl,
  paymentIframeHeight,
  onPaymentIframeLoaded,
  loading,
}) => {
  const [disabled, setDisabled] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (billingSameAsShipping && Array.isArray(shippingAddress)) {
      setDisabled(true);
    } else if (!billingSameAsShipping && Array.isArray(billingAddress)) {
      setDisabled(true);
    } else if (shippingLines.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [billingAddress, shippingAddress, billingSameAsShipping]);

  const style = {
    height: `${paymentIframeHeight}px`,
    display: (disabled || loading) ? 'none' : null,
  };

  let content = '';

  if (disabled) {
    content = <EmptyState title={t('payment.empty')} />;
  } else if (loading) {
    content = <LoadingState />;
  }

  return (
    <CheckoutSection
      className="FieldSet--PaymentMethod"
      title={t('payment.method')}
    >
      <iframe
        title="payments"
        data-bold-pigi-iframe
        className="PaymentMethod__Iframe"
        src={paymentIframeUrl}
        style={style}
        onLoad={onPaymentIframeLoaded}
      />
      { content }
    </CheckoutSection>
  );
});

export default PaymentMethod;
