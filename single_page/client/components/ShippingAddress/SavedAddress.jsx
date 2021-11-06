import React from 'react';

const SavedAddress = ({ addressInfo }) => (
  <div className="CheckoutStep__FieldSetInfoContainer">
    <span className="CheckoutStep__FieldSetInfo">
      {addressInfo.first_name}
      {' '}
      {addressInfo.last_name}
    </span>
    <span className="CheckoutStep__FieldSetInfo">{addressInfo.address_line_1}</span>
    <span className="CheckoutStep__FieldSetInfo">{addressInfo.address_line_2}</span>
    <span className="CheckoutStep__FieldSetInfo">
      {addressInfo.city}
      ,
      {' '}
      {addressInfo.province_code}
      ,
      {' '}
      {addressInfo.postal_code}
    </span>
    <span className="CheckoutStep__FieldSetInfo">{addressInfo.country}</span>
    <span className="CheckoutStep__FieldSetInfo">{addressInfo.phone_number}</span>
  </div>
);

export default SavedAddress;