import React from 'react';

const SavedAddress = ({ addressInfo }) => {
  const {
    first_name,
    last_name,
    address_line_1,
    address_line_2,
    city,
    province,
    postal_code,
    country,
    phone_number,
  } = addressInfo;

  return (
    <div className="CheckoutStep__FieldSetInfoContainer">
      <span className="CheckoutStep__FieldSetInfo">
        {`${first_name} ${last_name}`}
      </span>
      <span className="CheckoutStep__FieldSetInfo CheckoutStep__FieldSetInfo--Secondary">
        {`
        ${address_line_1},
        ${address_line_2 && address_line_2 + ','}
        ${city},
        ${province && province + ','}
        ${postal_code && postal_code + ','}
        ${country},
        ${phone_number && phone_number}
        `}
      </span>
    </div>
  );
};

export default SavedAddress;