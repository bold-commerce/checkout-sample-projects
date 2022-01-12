import React, { useEffect, useMemo, useState } from 'react';
import NewShippingAddress from './NewShippingAddress';
import ShippingAddressItem from './ShippingAddressItem';

const ShippingAddressList = ({ addresses, onChange, selectedAddress, disabled }) => {
  const [prevAddress, setPrevAddress] = useState(null);

  const shippingAddressList = addresses.map((address) => (
    <ShippingAddressItem
      address={address}
      key={address.id}
      onChange={onChange}
      selectedAddress={selectedAddress}
      disabled={disabled}
    />
  ));

  useEffect(() => {
    if (selectedAddress) {
      setPrevAddress(selectedAddress);
    }
  }, [selectedAddress]);

  const lastSelectedAddress = useMemo(() => {
    if (prevAddress) {
      return addresses.find((address) => address.id === prevAddress);
    } else {
      return addresses[0];
    }
  }, [prevAddress])

  // TODO: On select of new address, remove old address from order
  return (
    <ul className="AddressList">
      {shippingAddressList}
      <NewShippingAddress
        selected={selectedAddress === null || !selectedAddress}
        onChange={onChange}
        disabled={disabled}
        defaultAddress={lastSelectedAddress}
      />
    </ul>
  )
};

export default ShippingAddressList;
