import React from 'react';
import PropTypes from 'prop-types';

const CheckoutSection = ({ children, title, className }) => {
  return (
    <section className={`FieldSet ${className}`}>
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">{ title }</div>
      </div>
      <div className="FieldSet__Content">
        { children }
      </div>
    </section>
  );
};

CheckoutSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default CheckoutSection;
