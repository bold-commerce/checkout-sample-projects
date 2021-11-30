import React, { memo, useCallback, useState } from 'react';
import { useCustomer } from '@boldcommerce/checkout-react-components';
import { InputField } from '@boldcommerce/stacks-ui';
import { CheckoutStep } from '../CheckoutStep';
import { useAnalytics, useErrorLogging } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import './Customer.scss';
import { CondensedSection } from '../CondensedSection';
import { ConfirmationButton } from '../ConfirmationButton';

const Customer = ({ condensed }) => {
  const {data, submitCustomer } = useCustomer();

  return <MemoizedCustomer customer={data} submitCustomer={submitCustomer} condensed={condensed} />
}

const MemoizedCustomer = memo(({ customer, submitCustomer, condensed }) => {
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const [email, setEmail] = useState(customer?.email_address);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await submitCustomer({
        email_address: email,
      });
      trackEvent('set_customer');
      setErrors(null);
      setLoading(false);
      navigate('/shipping');
    } catch(e) {
      setLoading(false);
      setErrors(e.body.errors);
      logError('customer', e);
    }
  }, [email]);

  if (condensed) {
    return (
      <CheckoutStep
        className="CheckoutStep--CustomerInformation"
        title="1. Contact information"
        action={<Link to="/" className="FieldSet__Action">Change</Link>}
      >
        <CondensedSection 
          title="Email"
        >
          <p>{customer?.email_address}</p>
        </CondensedSection>
      </CheckoutStep>
    );
  }

  return (
    <CheckoutStep
      className="CheckoutStep--CustomerInformation"
      title="1. Contact information"
    >
      <div className="FieldSet__Label">
        <label htmlFor="email">Email</label>
        <a href="#">Log in</a>
      </div>
      <InputField
        className="InputField Field--Email"
        placeholder="Email"
        type="email"
        name="email"
        id="email"
        messageType={errors && 'alert'}
        messageText={errors && errors[0].message}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={customer.isAuthenticated}
      />
      <ConfirmationButton text="Continue to shipping" onClick={handleSubmit} loading={loading} disabled={loading} />
    </CheckoutStep>
  );
});

export default Customer;
