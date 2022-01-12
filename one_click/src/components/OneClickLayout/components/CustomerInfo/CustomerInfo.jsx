import React, { useEffect, useState } from "react";
import { useAnalytics, useErrorLogging } from "../../../../hooks";
import { InputField, CheckboxField } from "@boldcommerce/stacks-ui/lib";
import { useCustomer } from "@boldcommerce/checkout-react-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CustomerInfo = () => {
  const { errors: customerErrors, submitCustomer } = useCustomer();
  const [ acceptsMarketing, setAcceptsMarketing ] = useState(false)
  const [ email, setEmail ] = useState(null);
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const { t } = useTranslation();

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
      <h2 className="IndexGuest__Title">{t('customer.info')}</h2>
      <div className="IndexGuest__Login">{t('customer.already_have_account')}<Link to='#'>{t('customer.login')}</Link></div>
      <InputField
        type="email"
        name="email_address"
        placeholder={t('customer.email')}
        messageText={customerErrors && t('invalid_email') || ''}
        messageType={customerErrors && 'alert' || ''}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CheckboxField
        label={t('customer.subscribe')}
        checked={acceptsMarketing}
        onChange={() => setAcceptsMarketing(!acceptsMarketing)}
      />
    </div>
  )
};

export default CustomerInfo;