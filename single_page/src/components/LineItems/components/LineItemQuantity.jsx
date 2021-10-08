import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Button, Input } from '@boldcommerce/stacks-ui';

const LineItemQuantity = ({
  defaultValue,
  onChange,
  readOnly,
}) => {
  const [value, setValue] = useState(defaultValue);

  const increment = useCallback(() => {
    setValue(value + 1);
    onChange(value + 1);
  }, [value, setValue, onChange]);

  const decrement = useCallback(() => {
    setValue(value - 1);
    onChange(value - 1);
  }, [value, setValue, onChange]);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, [setValue]);

  const handleBlur = useCallback((e) => {
    const [val] = e.target.value.split('.');
    const num = parseInt(val, 10);

    // Reseting the quantity to previous state if the value entered is invalid
    if (Number.isNaN(num) || num < 1) {
      setValue(defaultValue);
      return;
    }

    setValue(num);
    onChange(num);
  }, [value, onChange, setValue, defaultValue]);

  return (
    <div className="LineItem__LineItemQuantityWrapper">
      <div className="LineItemQuantity__Decrement">
        {!readOnly && (
          <Button disabled={typeof value === 'string' || value <= 1} onClick={decrement}>-</Button>
        )}
      </div>
      <div className={classNames('LineItemQuantity', { 'LineItemQuantity--read-only': readOnly })}>
        {
          readOnly ? <span className="LineItemQuantity__ReadOnlyValue">{value}</span> : (
            <Input
              readOnly={readOnly}
              type="number"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )
        }
      </div>
      <div className="LineItemQuantity__Increment">
        {!readOnly && (
          <Button disabled={typeof value === 'string'} onClick={increment}>+</Button>
        )}
      </div>
    </div>
  );
};

export default LineItemQuantity;
