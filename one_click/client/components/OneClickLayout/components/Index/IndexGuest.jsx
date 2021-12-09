import React, { useContext, useState, useEffect } from "react";
import { Button, CheckboxField, InputField, Price } from "@boldcommerce/stacks-ui/lib";
import { useShippingAddress, useCountryInfo, useCheckoutStore, useCustomer } from "@boldcommerce/checkout-react-components";
import { useAnalytics, useErrorLogging } from "../../../../hooks";
import { ShippingLines } from "../ShippingLines";
import { ChevronRight } from "../Icons";
import { AppContext } from "../../context/AppContext";
import { Address } from "../Address";
import { Header } from "../Header";
import { Link } from "react-router-dom";
import classNames from "classnames";

const IndexGuest = ({ onSectionChange, show }, ref) => {
  const { websiteName } = useContext(AppContext);
  const { state } = useCheckoutStore();
  const { data: shippingAddress, errors: shippingErrors, submitShippingAddress } = useShippingAddress();
  const [address, setAddress] = useState(shippingAddress);
  const [email, setEmail] = useState(null);
  const [acceptsMarketing, setAcceptsMarketing] = useState(false)
  const { data: countryInfo } = useCountryInfo(address);
  const { data: customer, errors: customerErrors, submitCustomer } = useCustomer();
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();

  const requiredAddressFields = ['first_name','last_name','address_line_1','city'];
  let provincePlaceholder = countryInfo.provinceLabel;

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
    <div ref={ref} className={classNames('Sidebar IndexGuest', show ? 'Sidebar--Show' : 'IndexPage--Hide')}>
      <Header title={websiteName} />
      <div className="IndexGuest-summary">
        <button
          className="IndexGuest-summary-btn"
          onClick={() => onSectionChange('summary')}
        >
          <ChevronRight className="IndexGuest-chevron"/>
          <h2>Summary</h2>
          <Price amount={state.applicationState.order_total} />
      </button>
      </div>
      <div className="IndexGuest-customer">
        <h2 className="IndexGuest-title">Customer Info</h2>
        <div className="IndexGuest-login">Already have an account? <Link to='#'>Log in</Link></div>
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
      <div className="IndexGuest-shipping-address">
        <h2 className="IndexGuest-title">Shipping address</h2>
        <Address
              address={address}
              onChange={(d) => setAddress((prevAddress) => ({
                ...prevAddress,
                ...d,
              }))}
              errors={shippingErrors}
              countries={countryInfo.countries}
              provinces={countryInfo.provinces}
              showPostalCode={countryInfo.showPostalCode}
              showProvince={countryInfo.showProvince}
              submit={() => submitShippingAddress(address)}
              provinceLabel={provincePlaceholder}
              requiredAddressFields={requiredAddressFields}
            />
      </div>
      <div className="IndexGuest-shipping-method">
        <ShippingLines activePage={show} disabled={Boolean(shippingErrors)} />
      </div>
      <div className="IndexGuest-footer">
        <Button
          className="IndexGuest-billing-btn"
          onClick={() => onSectionChange('billing')}
          disabled={!(customer.email_address && state.applicationState.shipping.selected_shipping && !shippingErrors && !customerErrors)}
          primary
        >
          Continue to billing
        </Button>
        <div className="IndexGuest-footer-login">
          <Link to="#">Back to log in</Link>
        </div>          
        <div className="IndexGuest-rights">{`All right reserved ${websiteName}`}</div>
      </div>
    </div>
  )
}

const IndexGuestForwardedRef = React.forwardRef(IndexGuest);

export default IndexGuestForwardedRef;