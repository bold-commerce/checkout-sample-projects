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
  const containerClassNames = cn([
    'SelectField__Container',
    className,
  ]);

  const classNames = cn([
    'SelectField',
    {'SelectField--alert': messageType === 'alert' || messageType === 'error'},
    {'SelectField--disabled': disabled}
  ])

  return (
    <div className={containerClassNames}>
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
