import React from 'react';
import { RadioItem } from '../RadioItem';

const ShippingAddressItem = ({ address, onChange, selectedAddress, disabled }) => {
  const { address_line_1, address_line_2, city, province, postal_code, country, phone_number, first_name, last_name } = address;
  const addressArray = [address_line_1, address_line_2, city, province, postal_code, country];
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
        <p>{phone_number}</p>
      </RadioItem>
    </li>
  )
};

export default ShippingAddressItem;
