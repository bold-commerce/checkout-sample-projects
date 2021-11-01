import React, { memo, useCallback, useEffect, useState } from 'react';
import { useCountryInfo, useLoadingStatus, useSavedAddresses, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { Address } from '../Address';
import { SavedAddressList } from '../SavedAddressList';
import './ShippingAddress.css';

const ShippingAddress = () => {
  const { data, submitShippingAddress } = useShippingAddress();
  const { data: savedAddresses } = useSavedAddresses();
  const { data: loadingStatus } = useLoadingStatus();

  return (
    <MemoizedShippingAddress
      shippingAddress={data}
      submitAddress={submitShippingAddress}
      savedAddresses={savedAddresses}
      disabled={loadingStatus.isLoading}
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
      setAddress(shippingAddress);
    }
  }, [shippingAddress]);

  return (
    <>
      <section className="FieldSet FieldSet--ShippingMethod">
        <div className="FieldSet__Header">
          <div className="FieldSet__Heading">Shipping address</div>
        </div>
        <div className="FieldSet__Content">
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
        </div>
      </section>
    </>
  );
});

export default ShippingAddress