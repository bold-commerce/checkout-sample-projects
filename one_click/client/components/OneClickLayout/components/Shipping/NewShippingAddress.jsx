import React, { useState } from 'react';
import { useCountryInfo, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { RadioItem } from '../RadioItem';
import { Address } from '../Address';

const NewShippingAddress = ({ selected, onChange, disabled, defaultAddress }) => {
  const {
    shippingAddress, countryInfo, shippingAddressErrors, submitShippingAddress,
  } = useShippingAddress();
  const [address, setAddress] = useState(shippingAddress);
  const {
    countries,
    provinces,
    showProvince,
    showPostalCode,
    provinceLabel,
  } = useCountryInfo(countryInfo, address);

  let provincePlaceholder = provinceLabel;

  // TODO: replace with languages config file
  if (provinceLabel === 'state_territory') {
    provincePlaceholder = 'state/territory';
  }

  return (
    <li>
      <RadioItem
        name="shipping_address"
        id={`address_0`}
        checked={selected}
        onChange={() => onChange({
          ...defaultAddress,
          id: null,
        })}
        disabled={disabled}
      >
        <p>Use new address</p>
      </RadioItem>
      {
        selected && (
          <div className="RadioButton RadioButton__NewAddressContainer">
            <Address
              address={address}
              onChange={(data) => setAddress((prevAddress) => ({
                ...prevAddress,
                ...data,
              }))}
              errors={shippingAddressErrors}
              countries={countries}
              provinces={provinces}
              showPostalCode={showPostalCode}
              showProvince={showProvince}
              submit={() => submitShippingAddress(address)}
              provinceLabel={provincePlaceholder}
            />
        </div>
        )
      }
    </li>
  )
};

export default NewShippingAddress;
