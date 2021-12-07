import React, { useContext, useState, useEffect } from "react";
import { Button, CheckboxField, InputField, Price } from "@boldcommerce/stacks-ui/lib";
import { useShippingAddress, useCountryInfo, useCheckoutStore } from "@boldcommerce/checkout-react-components";
import { AppContext } from "../../context/AppContext";
import { Address } from "../Address";
import { Header } from "../Header";
import { Link } from "react-router-dom";
import classNames from "classnames";

const IndexGuest = ({ onSectionChange, show }) => {
  const { websiteName } = useContext(AppContext);
  const { state } = useCheckoutStore();
  const { data: shippingAddress, errors, submitShippingAddress } = useShippingAddress();
  const [address, setAddress] = useState(shippingAddress);
  const { data: countryInfo } = useCountryInfo(address);
  console.log(state);

  let provincePlaceholder = countryInfo.provinceLabel;

  return (
    <div className={classNames('Sidebar IndexGuest', show ? 'Sidebar--Show' : 'IndexPage--Hide')}>
      <Header title={websiteName} />
      <div className="SummaryOI">
        <h2>Summary</h2>
        <Price amount={state.applicationState.order_total} />
      </div>
      <div className="CustomerInfoOI">
        <h2>Customer Info</h2>
        <div>Already have an account? <Link to='#'>Log in</Link></div>
        <InputField
          placeholder="Email address"
          type="text"
        />
        <CheckboxField
          label="Subscribe to our newsletter"
        />
      </div>
      <div className="ShippingAddressOI">
        <h2>Shipping address</h2>
        <Address
              address={address}
              onChange={(d) => setAddress((prevAddress) => ({
                ...prevAddress,
                ...d,
              }))}
              errors={errors}
              countries={countryInfo.countries}
              provinces={countryInfo.provinces}
              showPostalCode={countryInfo.showPostalCode}
              showProvince={countryInfo.showProvince}
              submit={() => submitShippingAddress(address)}
              provinceLabel={provincePlaceholder}
            />
      </div>
      <div className="ShippingMethodOI">
        <h2>Shipping method</h2>
        <div>To see shipping options complete filling in your address above</div>
      </div>
      <div className="FooterOI">
        <Button
          disabled
        >
          Continue to billing
        </Button>
        <Link to="#">Back to log in</Link>
        <div>{`All right reserved ${websiteName}`}</div>
      </div>
    </div>
  )
}

export default IndexGuest;