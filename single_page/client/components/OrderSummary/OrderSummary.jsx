import React from 'react';
import PropTypes from 'prop-types';
import { CheckoutSection } from '../CheckoutSection';
import { LineItems } from '../LineItems';
import { DiscountForm } from '../DiscountForm';
import { OrderSummaryBreakdown } from '.';

const OrderSummary = ({ readOnly }) => {
  return (
    <CheckoutSection
      className="FieldSet--OrderSummary"
      title="Order Summary"
    >
      <LineItems readOnly={readOnly} />
      <DiscountForm />
      <OrderSummaryBreakdown />
    </CheckoutSection>
  );
};

OrderSummary.propTypes = {
  readOnly: PropTypes.bool,
};

export default OrderSummary;
