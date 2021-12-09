import React, { useContext, useState, useEffect } from "react";
import { Button, Price } from "@boldcommerce/stacks-ui/lib";
import { useShippingAddress, useCountryInfo, useCheckoutStore, useCustomer } from "@boldcommerce/checkout-react-components";
import { ShippingLines } from "../ShippingLines";
import { ChevronRight } from "../Icons";
import { AppContext } from "../../context/AppContext";
import { Address } from "../Address";
import { Header } from "../Header";
import { Link } from "react-router-dom";
import classNames from "classnames";
import CustomerInfo from "../CustomerInfo/CustomerInfo";

const IndexGuest = ({ onSectionChange, show }, ref) => {
  const { websiteName } = useContext(AppContext);
  const { state } = useCheckoutStore();
  const { data: shippingAddress, errors: shippingErrors, submitShippingAddress } = useShippingAddress();
  const [ address, setAddress ] = useState(shippingAddress);
  const { data: countryInfo } = useCountryInfo(address);
  const { data: customer, errors: customerErrors, submitCustomer } = useCustomer();

  const requiredAddressFields = ['first_name','last_name','address_line_1','city'];
  let provincePlaceholder = countryInfo.provinceLabel;

  return (
    <div ref={ref} className={classNames('Sidebar IndexGuest', show ? 'Sidebar--Show' : 'IndexPage--Hide')}>
      <Header title={websiteName} />
      <div className="IndexGuest__Summary">
        <button
          className="IndexGuest__Summary__Btn"
          onClick={() => onSectionChange('summary')}
        >
          <ChevronRight className="IndexGuest__Chevron"/>
          <h2>Summary</h2>
          <Price amount={state.applicationState.order_total} />
      </button>
      </div>
      <CustomerInfo />      
      <div className="IndexGuest__ShippingAddress">
        <h2 className="IndexGuest__Title">Shipping address</h2>
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
      <div className="IndexGuest__ShippingMethod">
        <ShippingLines activePage={show} disabled={Boolean(shippingErrors)} />
      </div>
      <div className="IndexGuest__Footer">
        <Button
          className="IndexGuest__Billing-btn"
          onClick={() => onSectionChange('billing')}
          disabled={!(customer.email_address && state.applicationState.shipping.selected_shipping && !shippingErrors && !customerErrors)}
          primary
        >
          Continue to billing
        </Button>
        <div className="IndexGuest__Footer--login">
          <Link to="#">Back to log in</Link>
        </div>          
        <div className="IndexGuest__Rights">{`All right reserved ${websiteName}`}</div>
      </div>
    </div>
  )
}

const IndexGuestForwardedRef = React.forwardRef(IndexGuest);

export default IndexGuestForwardedRef;