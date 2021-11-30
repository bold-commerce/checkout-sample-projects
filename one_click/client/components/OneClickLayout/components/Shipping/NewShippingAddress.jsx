import React, { useState, useCallback } from 'react';
import { useCountryInfo, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { RadioItem } from '../RadioItem';
import { Address } from '../Address';

const NewShippingAddress = ({ selected, onChange, disabled, defaultAddress }) => {
  const { data: shippingAddress, errors, submitShippingAddress } = useShippingAddress();
  const [address, setAddress] = useState(shippingAddress);
  const { data: countryInfo } = useCountryInfo(address);

  let provincePlaceholder = countryInfo.provinceLabel;

  // TODO: replace with languages config file
  if (countryInfo.provinceLabel === 'state_territory') {
    provincePlaceholder = 'state/territory';
  }

  const handleOnChange = useCallback((currentAddress) => {
    setAddress(currentAddress);
    onChange(currentAddress);
  }, [])

  return (
    <li>
      <RadioItem
        name="shipping_address"
        id={`address_0`}
        checked={selected}
        onChange={() => handleOnChange({
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
        )
      }
    </li>
  )
};

export default NewShippingAddress;
