/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckboxField } from '@boldcommerce/stacks-ui';
import { Address } from '../Address';
import { useBillingAddress, useBillingSameAsShipping, useCountryInfo } from '@boldcommerce/checkout-react-components';
import './BillingAddress.css';
import { useAnalytics, useErrorLogging } from '../../../../hooks';
import { useTranslation } from 'react-i18next';

export const BillingAddress = ({
  billingAddress, billingSameAsShipping, submitBillingAddress, setBillingSameAsShipping, requiredAddressFields,
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
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const { t } = useTranslation();

  let provincePlaceholder = provinceLabel;

  const handleSubmit = async(data) => {
    setLoading(true);
    try {
      await submitBillingAddress(data);
      setErrors(null);
      trackEvent('set_billing_address');
    } catch(e) {
      logError('billing_address', e);
      setErrors(e.body.errors);
    }
    setLoading(false);
  };

  const handleSetBillingSameAsShipping = async(data) => {
    setLoading(true);
    try {
      await setBillingSameAsShipping(data)
      setErrors(null);
      trackEvent('set_billing_same_as_shipping');
    } catch(e) {
      logError('billing_same_as_shipping', e);
      setErrors(e.body.errors);
    }
    setLoading(false);
  };

  return (
    <section className="FieldSet FieldSet--BillingAddress">
      <div className="FieldSet__Header">
        <h3 className="Billing__Title">{t('billing.address')}</h3>
      </div>
      <div className="FieldSet__Content">
        <CheckboxField
          label={t('billing.same_as_shipping')}
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
