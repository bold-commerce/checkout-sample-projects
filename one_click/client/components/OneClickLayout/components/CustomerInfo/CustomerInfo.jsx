import React, { useEffect, useState } from "react";
import { useAnalytics, useErrorLogging } from "../../../../hooks";
import { InputField, CheckboxField } from "@boldcommerce/stacks-ui/lib";
import { useCustomer } from "@boldcommerce/checkout-react-components";
import { Link } from "react-router-dom";

const CustomerInfo = () => {
  const { errors: customerErrors, submitCustomer } = useCustomer();
  const [ acceptsMarketing, setAcceptsMarketing ] = useState(false)
  const [ email, setEmail ] = useState(null);
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();

  useEffect(() => {
    const postalCodeTimeout = setTimeout(() => {
      if (email) {
        try {
          submitCustomer({email_address: email, accepts_marketing: acceptsMarketing});
          trackEvent('set_customer')
        } catch (e) {
          logError('email_address')
        }
      }
    }, 2000);
    return () => clearTimeout(postalCodeTimeout);
  }, [email, acceptsMarketing]);

  return (
    <div className="IndexGuest__Customer">
      <h2 className="IndexGuest__Title">Customer Info</h2>
      <div className="IndexGuest__Login">Already have an account? <Link to='#'>Log in</Link></div>
      <InputField
        type="email"
        name="email_address"
        placeholder="Email address"
        messageText={customerErrors && 'Valid email is required' || ''}
        messageType={customerErrors && 'alert' || ''}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CheckboxField
        label="Subscribe to our newsletter"
        checked={acceptsMarketing}
        onChange={() => setAcceptsMarketing(!acceptsMarketing)}
      />
    </div>
  )
};

export default CustomerInfo;