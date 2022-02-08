/* eslint-disable */
import cn from 'classnames';
import React from 'react';
import './SelectField.scss';

const SelectField = ({
  placeholder,
  disabled,
  children,
  value,
  messageType,
  messageText,
  className,
  ...otherProps
}) => {
  const classNames = cn([
    'SelectField',
    {'SelectField--alert': messageType === 'alert' || messageType === 'error'},
    {'SelectField--disabled': disabled},
    className,
  ]);

  return (
    <div className="SelectedField__Container">
      <div className={classNames}>
        <select
          {...otherProps}
          className="SelectField__Select"
          disabled={disabled}
          value={value}
          valueattr={value}
        >
          <option value="" hidden></option>

          {children}
        </select>
        <label className="SelectField__Label">{placeholder}</label>
      </div>
      { messageText && <div className='stx-field__message'>{ messageText }</div> }
    </div>
  );
};

export default SelectField;
