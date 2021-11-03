/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RadioField from '@boldcommerce/stacks-ui/lib/components/radiofield/RadioField';
import { Address } from '../Address';
import { useBillingAddress, useCountryInfo } from '@boldcommerce/checkout-react-components';
import './BillingAddress.css';

export const BillingAddress = ({
  billingAddress, countryInfo, billingAddressErrors, billingSameAsShipping, submitBillingAddress, setBillingSameAsShipping, onChange, requiredAddressFields,
}) => {
  const [address, setAddress] = useState(billingAddress);
  const {
    countries,
    provinces,
    showProvince,
    showPostalCode,
    provinceLabel,
  } = useCountryInfo(countryInfo, address);

  let provincePlaceholder = provinceLabel;

  // TODO: replace with languages config file
  if (provinceLabel === 'state_territory') {
    provincePlaceholder = 'state/territory';
  }

  useEffect(() => {
    if (onChange) {
      onChange(address);
    }
  }, [address]);

  return (
    <section className="FieldSet FieldSet--BillingAddress">
      <div className="FieldSet__Header">
        <h3>Billing address</h3>
      </div>
      <div className="FieldSet__Content">
        <RadioField
          label="Same as shipping address"
          name="billing-address"
          className="RadioButton"
          value="SAME_AS_SHIPPING_ADDRESS"
          checked={billingSameAsShipping}
          onChange={() => setBillingSameAsShipping(true)}
        />
        <RadioField
          label="Use a different billing address"
          name="billing-address"
          className="RadioButton"
          value="DIFFERENT_BILLING_ADDRESS"
          checked={!billingSameAsShipping}
          onChange={() => setBillingSameAsShipping(false)}
        />
        { billingSameAsShipping ? null
          : (
            <Address
              address={address}
              onChange={(data) => setAddress((prevAddress) => ({
                ...prevAddress,
                ...data,
              }))}
              errors={billingAddressErrors}
              countries={countries}
              provinces={provinces}
              showPostalCode={showPostalCode}
              showProvince={showProvince}
              provinceLabel={provincePlaceholder}
              submit={() => submitBillingAddress(address)}
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

const BillingAddressContainer = ({ onChange, requiredAddressFields }) => {
  const {
    billingAddress, countryInfo, billingAddressErrors, billingSameAsShipping, submitBillingAddress, setBillingSameAsShipping,
  } = useBillingAddress(requiredAddressFields);

  return (
    <MemoizedBillingAddress
      billingAddress={billingAddress}
      countryInfo={countryInfo}
      billingAddressErrors={billingAddressErrors}
      billingSameAsShipping={billingSameAsShipping}
      onChange={onChange}
      submitBillingAddress={onChange || submitBillingAddress}
      setBillingSameAsShipping={setBillingSameAsShipping}
      requiredAddressFields={requiredAddressFields}
    />
  );
};

BillingAddressContainer.propTypes = {
  onChange: PropTypes.func,
  requiredAddressFields: PropTypes.array,
};

export default BillingAddressContainer;
