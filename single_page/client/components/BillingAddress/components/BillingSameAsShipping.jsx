import { RadioField } from '@boldcommerce/stacks-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

const BillingSameAsShipping = ({
  billingSameAsShipping,
  setBillingSameAsShipping,
  disabled,
}) => {
  const { t } = useTranslation();
  return (
  <>
    <RadioField
      label={t('billing.same_as_shipping')}
      name="billing-address"
      className="RadioButton"
      value="SAME_AS_SHIPPING_ADDRESS"
      checked={billingSameAsShipping}
      onChange={() => setBillingSameAsShipping(true)}
      disabled={disabled}
    />
    <RadioField
      label={t('billing.different_from_shipping')}
      name="billing-address"
      className="RadioButton"
      value="DIFFERENT_BILLING_ADDRESS"
      checked={!billingSameAsShipping}
      onChange={() => setBillingSameAsShipping(false)}
      disabled={disabled}
    />
  </>
  );
};

export default BillingSameAsShipping;
