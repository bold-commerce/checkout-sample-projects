/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckboxField } from '@boldcommerce/stacks-ui';
import { Address } from '../Address';
import { useBillingAddress, useBillingSameAsShipping, useCountryInfo } from '@boldcommerce/checkout-react-components';
import './BillingAddress.css';

export const BillingAddress = ({
  billingAddress, billingSameAsShipping, submitBillingAddress, setBillingSameAsShipping, onChange, requiredAddressFields,
}) => {
  const [address, setAddress] = useState(billingAddress);
  const { data } = useCountryInfo(address);
  const{
    countries,
    provinces,
    showProvince,
    showPostalCode,
    provinceLabel,
  } = data;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  let provincePlaceholder = provinceLabel;

  // TODO: replace with languages config file
  if (provinceLabel === 'state_territory') {
    provincePlaceholder = 'state/territory';
  }

  const handleSubmit = async(data) => {
    setLoading(true);
    try {
      await submitBillingAddress(data);
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  };

  const handleSetBillingSameAsShipping = async(data) => {
    setLoading(true);
    try {
      await setBillingSameAsShipping(data)
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  };

  return (
    <section className="FieldSet FieldSet--BillingAddress">
      <div className="FieldSet__Header">
        <h3>Billing address</h3>
      </div>
      <div className="FieldSet__Content">
        <CheckboxField
          label="Same as shipping address"
          name="billing-address"
          className="RadioButton"
          value="SAME_AS_SHIPPING_ADDRESS"
          checked={billingSameAsShipping}
          disabled={loading}
          onChange={() => handleSetBillingSameAsShipping(!billingSameAsShipping)}
        />
        { billingSameAsShipping ? null
          : (
            <Address
              address={address}
              onChange={(data) => setAddress((prevAddress) => ({
                ...prevAddress,
                ...data,
              }))}
              errors={errors}
              countries={countries}
              provinces={provinces}
              showPostalCode={showPostalCode}
              showProvince={showProvince}
              provinceLabel={provincePlaceholder}
              submit={() => handleSubmit(address)}
              requiredAddressFields={requiredAddressFields}
            />
          )}
      </div>
    </section>
  );
};

BillingAddress.propTypes = {
  billingAddress: PropTypes.any,
  countryInfo: PropTypes.array,
  billingAddressErrors: PropTypes.object,
  billingSameAsShipping: PropTypes.bool,
  submitBillingAddress: PropTypes.func,
  setBillingSameAsShipping: PropTypes.func,
  onChange: PropTypes.func,
  requiredAddressFields: PropTypes.array,
};

const MemoizedBillingAddress = React.memo(BillingAddress);

const BillingAddressContainer = ({ requiredAddressFields }) => {
  const { data: billingAddress, submitBillingAddress } = useBillingAddress();
  const { data: billingSameAsShipping, setBillingSameAsShipping } = useBillingSameAsShipping(); 

  return (
    <MemoizedBillingAddress
      billingAddress={billingAddress}
      billingSameAsShipping={billingSameAsShipping}
      submitBillingAddress={submitBillingAddress}
      setBillingSameAsShipping={setBillingSameAsShipping}
      requiredAddressFields={requiredAddressFields}
    />
  );
};

BillingAddressContainer.propTypes = {
  requiredAddressFields: PropTypes.array,
};

export default BillingAddressContainer;
