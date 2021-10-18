import React from 'react';
import { RadioItem } from '../RadioItem';

const ShippingAddressItem = ({ address, onChange, selectedAddress, disabled }) => {
  const { address1, address2, city, province, zip, country, phone, first_name, last_name } = address;
  const addressArray = [address1, address2, city, province, zip, country];
  const addressCombined = addressArray.filter((addressString) => addressString !== '').join(', ');

  return (
    <li>
      <RadioItem 
        name="shipping_address"
        id={`address_${address.id}`}
        checked={address.id === selectedAddress}
        onChange={() => onChange(address)}
        disabled={disabled}
      >
        <p>{`${first_name} ${last_name}`}</p>
        <p>{addressCombined}</p>
        <p>{phone}</p>
      </RadioItem>
    </li>
  )
};

export default ShippingAddressItem;
