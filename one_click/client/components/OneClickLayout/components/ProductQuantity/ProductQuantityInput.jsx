import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';


const ProductQuantity = ({
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

    // Reseting the quantity to previous state if the value entered
    // is invalid
    if (Number.isNaN(num) || num < 1) {
      setValue(defaultValue);
      return;
    }

    setValue(num);
    onChange(num);
  }, [value, onChange, setValue, defaultValue]);

  return (
    <div className="CartItem__ProductQuantityWrapper">
      <div className="ProductQuantity">
        {value}
      </div>
    </div>
  );
};

ProductQuantity.propTypes = {
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default React.memo(ProductQuantity);
