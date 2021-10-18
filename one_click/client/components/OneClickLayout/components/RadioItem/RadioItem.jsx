import React from 'react';

const RadioItem = ({name, id, checked, onChange, disabled, children}) => {
  return (
    <div className="RadioItem">
      <input type="radio" name={name} id={id} checked={checked} onChange={onChange} disabled={disabled} />
      <label className="RadioItem__Content" htmlFor={id}>
        {children}
      </label>
    </div>
  )
};

export default RadioItem;
