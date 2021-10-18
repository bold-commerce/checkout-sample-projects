import React from 'react';
import { RadioItem } from '../RadioItem';

const NewShippingAddress = ({ selected, onChange, disabled, defaultAddress }) => {
  console.log(defaultAddress);
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
          <div>
            New Address Form goes here
          </div>
        )
      }
    </li>
  )
};

export default NewShippingAddress;
