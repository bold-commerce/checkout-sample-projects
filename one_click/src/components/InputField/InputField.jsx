/* eslint-disable */
import cn from 'classnames';
import React from 'react';
import './InputField.scss';

const InputField = ({
  value,
  placeholder,
  disabled,
  messageText,
  messageType,
  className,
  ...otherParams
}) => {
  const classNames = cn([
    'InputField',
    {'InputField--alert': messageType === 'alert' || messageType === 'error'},
    {'InputField--disabled': disabled},
    className,
  ]);

  return (
    <div className="InputField__Container">
      <div className={classNames}>
        <input
          {...otherParams}
          className="InputField__Input"
          value={value}
          disabled={disabled}
        />
        <label className="InputField__Label">{placeholder}</label>
      </div>
      { messageText && <div className='stx-field__message'>{ messageText }</div> }
    </div>
  );
};

export default InputField;
