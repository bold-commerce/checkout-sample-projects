import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckoutSection } from '../CheckoutSection';
import { LineItems } from '../LineItems';
import { DiscountForm } from '../DiscountForm';
import { OrderSummaryBreakdown, OrderSummaryCollapseButton } from '.';
import './OrderSummary.css';

const OrderSummary = ({ readOnly, summaryOpen, onCollapse }) => {
  return (
    <>
      <OrderSummaryCollapseButton onClick={onCollapse} summaryOpen={summaryOpen} />
      <div id="OrderSummary" className="OrderSummary">
        <CheckoutSection
          className="FieldSet--OrderSummary"
          title="Order Summary"
        >
          <LineItems readOnly={readOnly} />
          { !readOnly && <DiscountForm /> }
          <OrderSummaryBreakdown />
        </CheckoutSection>
      </div>
    </>
  );
};

OrderSummary.propTypes = {
  readOnly: PropTypes.bool,
};

export default OrderSummary;
