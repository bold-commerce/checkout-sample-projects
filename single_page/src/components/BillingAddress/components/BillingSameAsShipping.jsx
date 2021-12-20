import { RadioField } from '@boldcommerce/stacks-ui';
import React from 'react';

const BillingSameAsShipping = ({
  billingSameAsShipping,
  setBillingSameAsShipping,
  disabled,
}) => (
  <>
    <RadioField
      label="Same as shipping address"
      name="billing-address"
      className="RadioButton"
      value="SAME_AS_SHIPPING_ADDRESS"
      checked={billingSameAsShipping}
      onChange={() => setBillingSameAsShipping(true)}
      disabled={disabled}
    />
    <RadioField
      label="Use a different billing address"
      name="billing-address"
      className="RadioButton"
      value="DIFFERENT_BILLING_ADDRESS"
      checked={!billingSameAsShipping}
      onChange={() => setBillingSameAsShipping(false)}
      disabled={disabled}
    />
  </>
);

export default BillingSameAsShipping;
