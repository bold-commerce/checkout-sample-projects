import { RadioField, Price } from '@boldcommerce/stacks-ui';
import React from 'react';

const ShippingLineList = ({ shippingLines, selectedShippingLine, onChange, disabled }) => {
  return (
    <div className="FieldSet__Content">
      {shippingLines && shippingLines.map((method, index) => (
        <div className="RadioButton" key={index}>
          <RadioField
            label={method.description}
            name="shipping-method"
            checked={selectedShippingLine === parseInt(method.id, 10)}
            className="RadioField"
            disabled={disabled}
            onChange={() => onChange(index)}
          />
          <Price className="ShippingMethod__Price" amount={method.amount} />
        </div>
      ))}
    </div>
  );
};

export default ShippingLineList;