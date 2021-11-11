import React, { memo, useCallback, useState } from 'react';
import { useCustomer } from '@boldcommerce/checkout-react-components';
import { InputField } from '@boldcommerce/stacks-ui';
import { CheckoutSection } from '../CheckoutSection';
import './Customer.css';

const Customer = () => {
  const {data, submitCustomer } = useCustomer();
  return <MemoizedCustomer customer={data} submitCustomer={submitCustomer} />
}

const MemoizedCustomer = memo(({ customer, submitCustomer }) => {
  const [email, setEmail] = useState(customer?.email_address);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await submitCustomer({
        email_address: email,
      });
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  }, [email]);

  return (
    <CheckoutSection
      className="FieldSet--CustomerInformation"
      title="Customer information"
    >
      <InputField
        className="InputField Field--Email"
        placeholder="Email"
        type="email"
        name="email"
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
