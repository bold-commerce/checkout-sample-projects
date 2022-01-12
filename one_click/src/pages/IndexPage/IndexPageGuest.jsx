import React, { useContext, useState } from "react";
import { Button } from "@boldcommerce/stacks-ui";
import { useShippingAddress, useCountryInfo, useCheckoutStore, useCustomer } from "@boldcommerce/checkout-react-components";
import { ShippingLines } from "../../components/ShippingLines";
import { AppContext } from "../../context/AppContext";
import { Address } from "../../components/Address";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { CustomerInfo } from "../../components/CustomerInfo";
import { SummaryCondensed } from "../../components/Summary";
import { useTranslation } from 'react-i18next';

const IndexPageGuest = ({ onSectionChange, show }, ref) => {
  const { websiteName } = useContext(AppContext);
  const { state } = useCheckoutStore();
  const { data: shippingAddress, errors: shippingErrors, submitShippingAddress } = useShippingAddress();
  const [ address, setAddress ] = useState(shippingAddress);
  const { data: countryInfo } = useCountryInfo(address);
  const { data: customer, errors: customerErrors } = useCustomer();
  const { t } = useTranslation();

  const requiredAddressFields = ['first_name','last_name','address_line_1','city'];
  let provincePlaceholder = countryInfo.provinceLabel;

  return (
    <div ref={ref} className={classNames('Sidebar IndexGuest', show ? 'Sidebar--Show' : 'IndexPage--Hide')}>
      <Header title={websiteName} />
      <SummaryCondensed onSectionChange={() => onSectionChange('summary')}/>
      <CustomerInfo />
      <div className="IndexGuest__ShippingAddress">
        <h2 className="IndexGuest__Title">{t('shipping.address')}</h2>
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
          {t('continue_to_billing')}
        </Button>
        <div className="IndexGuest__Footer--login">
          <Link to="#">{t('back_to_login')}</Link>
        </div>          
        <div className="IndexGuest__Rights">{`${t('all_rights_reserved')} ${websiteName}`}</div>
      </div>
    </div>
  )
}

const IndexPageGuestForwardedRef = React.forwardRef(IndexPageGuest);

export default IndexPageGuestForwardedRef;