/* eslint-disable react/forbid-prop-types */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { InputField, Button } from '@boldcommerce/stacks-ui';
import { useDiscount } from '@boldcommerce/checkout-react-components';
import './Discount.css';
import { useAnalytics, useErrorLogging } from '../../../../hooks';

export const Discount = ({
  discountApplied, discountCode, applyDiscount,
}) => {
  const [discount, setDiscount] = useState(discountCode);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();

  /**
  * Opens the discount modal
  */
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const submitDiscount = async () => {
    setLoading(true);
    try {
      await applyDiscount(discount);
      setErrors(null);
      trackEvent('apply_discount_code');
    } catch(e) {
      setErrors(e.body.errors);
      logError('discount_code', e);
    }
    setLoading(false);
  };

  if (!open) return (
    <div className="DiscountLink" onClick={openModal}>Discount code</div>
  );
  return (
    <div className="SummaryBlock Summary__DiscountForm">
      <div className="DiscountForm">
        <InputField
          type="text"
          placeholder="Enter discount code"
          value={discount}
          messageText={errors && errors[0].message}
          messageType={errors && 'alert'}
          onChange={(e) => setDiscount(e.target.value)}
          disabled={discountApplied || loading}
        />
        <Button
          primary={discountApplied || discount.length > 0}
          disabled={discount.length === 0 || discountApplied || loading}
          loading={loading}
          onClick={() => submitDiscount(discount)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

Discount.propTypes = {
  discountApplied: PropTypes.bool,
  discountCode: PropTypes.string,
  discountErrors: PropTypes.object,
  applyDiscount: PropTypes.func,
};

const MemoizedDiscount = React.memo(Discount);

const DiscountContainer = () => {
  const { data, applyDiscount } = useDiscount();

  return (
    <MemoizedDiscount
      discountApplied={data.discountApplied}
      discountCode={data.discountCode}
      applyDiscount={applyDiscount}
    />
  );
};

export default DiscountContainer;
