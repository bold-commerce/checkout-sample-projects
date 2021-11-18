import { useBillingAddress, useBillingSameAsShipping, useCountryInfo } from '@boldcommerce/checkout-react-components';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { BillingSameAsShipping } from './components';
import { Address } from '../Address';
import './BillingAddress.css';
import { CheckoutSection } from '../CheckoutSection';

const BillingAddress = ({ applicationLoading }) => {
  const { data, submitBillingAddress } = useBillingAddress();
  const { data: sameAsShipping, setBillingSameAsShipping } = useBillingSameAsShipping();

  return (
    <MemoizedBillingAddress
      billingAddress={data}
      billingSameAsShipping={sameAsShipping}
      submitAddress={submitBillingAddress}
      setBillingSameAsShipping={setBillingSameAsShipping}
      applicationLoading={applicationLoading}
    />
  );
};

const MemoizedBillingAddress = memo(({
  billingAddress,
  billingSameAsShipping,
  submitAddress,
  setBillingSameAsShipping,
  applicationLoading,
}) => {
  const [address, setAddress] = useState(null);
  const { data } = useCountryInfo(address);
  const {
    countries,
    provinces,
    showProvince,
    showPostalCode,
    provinceLabel,
  } = data;
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(billingSameAsShipping);

  let provincePlaceholder = provinceLabel;

  if (provinceLabel === 'state_territory') {
    provincePlaceholder = 'state/territory';
  }

  useEffect(() => {
    setAddress(billingAddress);
  }, [billingAddress])

  const updateBillingAddress = useCallback(async (currentAddress) => {
    setAddress(currentAddress);
    try {
      await submitAddress(currentAddress);
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
      // If there is a server error, reset billing address
      if (e.body.errors[0].field === 'order') {
        setAddress(billingAddress);
      }
    }
  }, [billingAddress]);

  const updateBillingSameAsShipping = useCallback(async (value) => {
    setLoading(true);
    setSameAsShipping(value);
    try {
      await setBillingSameAsShipping(value);
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
      // If there is a server error, reset billing same as shipping
      if (e.body.errors[0].field === 'order') {
        setSameAsShipping(billingSameAsShipping);
      }
    }
    setLoading(false);
  }, [billingSameAsShipping]);

  const handleChange = useCallback((data) => {
    setAddress({
      ...address,
      ...data
    });
  }, [address]);

  return (
    <CheckoutSection
      className="FieldSet--BillingAddress"
      title="Billing address"
    >
      <BillingSameAsShipping
        billingSameAsShipping={sameAsShipping}
        setBillingSameAsShipping={updateBillingSameAsShipping}
        disabled={loading || applicationLoading}
      />
      { !billingSameAsShipping && (
        <Address
          address={address}
          onChange={handleChange}
          errors={errors}
          countries={countries}
          provinces={provinces}
          showPostalCode={showPostalCode}
          showProvince={showProvince}
          provinceLabel={provincePlaceholder}
          submit={() => updateBillingAddress(address)}
        />
      )}
    </CheckoutSection>
  );
});

export default BillingAddress;
