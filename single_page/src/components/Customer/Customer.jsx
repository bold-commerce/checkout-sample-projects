import React, { memo, useCallback, useState } from 'react';
import { useCustomer } from '@boldcommerce/checkout-react-components';
import { InputField } from '@boldcommerce/stacks-ui';
import { CheckoutSection } from '../CheckoutSection';
import './Customer.css';
import { useAnalytics, useErrorLogging } from '../../hooks';
import { useTranslation } from 'react-i18next';

const Customer = () => {
  const {data, submitCustomer } = useCustomer();

  return <MemoizedCustomer customer={data} submitCustomer={submitCustomer} />
}

const MemoizedCustomer = memo(({ customer, submitCustomer }) => {
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const [email, setEmail] = useState(customer?.email_address);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await submitCustomer({
        email_address: email,
      });
      trackEvent('set_customer');
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
      logError('customer', e);
    }
    setLoading(false);
  }, [email]);

  return (
    <CheckoutSection
      className="FieldSet--CustomerInformation"
      title={t('customer.info')}
    >
      <InputField
        className="InputField Field--Email"
        placeholder={t('customer.email')}
        type="email"
        name="email"
        autoComplete="email"
        messageType={errors && 'alert'}
        messageText={errors && errors[0].message}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={customer.isAuthenticated}
        onBlur={handleSubmit}
      />
    </CheckoutSection>
  );
});

export default Customer;
