import React, { forwardRef } from 'react';
import './CheckoutStep.scss';

const CheckoutStep = forwardRef(({ children, title, className, action }, ref) => {
  return (
    <section className={`CheckoutStep ${className}`} ref={ref}>
      <div className="CheckoutStep__Header">
        <h3 className="CheckoutStep__Heading">{ title }</h3>
        { action && (
          <div className="CheckoutStep__Action">
            { action }
          </div>
        )}
      </div>
      <div className="CheckoutStep__Content">
        { children }
      </div>
    </section>
  );
});

export default CheckoutStep;
