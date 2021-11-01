import React, { memo, useCallback, useState } from 'react';
import { useCustomer } from '@boldcommerce/checkout-react-components';
import { InputField } from '@boldcommerce/stacks-ui';
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
    <section className="FieldSet FieldSet--CustomerInformation">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Customer information</div>
      </div>
      <div className="FieldSet__Content">
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
      </div>
    </section>
  );
});

export default Customer;
