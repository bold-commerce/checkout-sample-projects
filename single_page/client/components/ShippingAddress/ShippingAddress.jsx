import React, { memo, useCallback, useState } from 'react';
import { useCountryInfo, useLoadingStatus, useSavedAddresses, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { Address } from '../Address';
import { SavedAddressList } from './components';
import { CheckoutSection } from '../CheckoutSection';
import './ShippingAddress.css';

const ShippingAddress = () => {
  const { data, submitShippingAddress } = useShippingAddress(['first_name', 'last_name']);
  const { data: savedAddresses } = useSavedAddresses();
  const { data: loadingStatus } = useLoadingStatus();
  const disabled = loadingStatus.shippingAddress === 'setting';

  return (
    <MemoizedShippingAddress
      shippingAddress={data}
      submitAddress={submitShippingAddress}
      savedAddresses={savedAddresses}
      disabled={disabled}
    />
  );
};

const MemoizedShippingAddress = memo(({
  shippingAddress,
  submitAddress,
  savedAddresses,
  disabled,
  requiredAddressFields,
}) => {
  const [address, setAddress] = useState(shippingAddress);
  const { data } = useCountryInfo(address);
  const {
    countries,
    provinces,
    showProvince,
    showPostalCode,
    provinceLabel,
  } = data;
  const [errors, setErrors] = useState(null);

  let provincePlaceholder = provinceLabel;

  if (provinceLabel === 'state_territory') {
    provincePlaceholder = 'state/territory';
  }

  const updateSelectedShippingAddress = useCallback(async (currentAddress) => {
    setAddress(currentAddress);
    try {
      await submitAddress(currentAddress);
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
      // If there is a server error, reset shipping address
      if (e.body.errors[0].field === 'order') {
        setAddress(shippingAddress);
      }
    }
  }, [shippingAddress]);

  return (
    <CheckoutSection
      className="FieldSet--ShippingMethod"
      title="Shipping address"
    >
      <SavedAddressList
        savedAddresses={savedAddresses}
        selectedAddress={address?.id}
        onChange={updateSelectedShippingAddress}
        disabled={disabled}
      />
      { (address?.id === undefined || address?.id === null) && (
        <Address
          address={address}
          onChange={(data) => setAddress((prevAddress) => ({
            ...prevAddress,
            ...data,
          }))}
          errors={errors}
          countries={countries}
          provinces={provinces}
          showPostalCode={showPostalCode}
          showProvince={showProvince}
          provinceLabel={provincePlaceholder}
          submit={() => updateSelectedShippingAddress(address)}
          requiredAddressFields={requiredAddressFields}
        />
      )}
    </CheckoutSection>
  );
});

export default ShippingAddress