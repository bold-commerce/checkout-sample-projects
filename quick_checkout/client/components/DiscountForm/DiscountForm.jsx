import { useDiscount } from '@boldcommerce/checkout-react-components';
import { Button, InputField } from '@boldcommerce/stacks-ui';
import React, { memo, useCallback, useState } from 'react';
import { useAnalytics, useErrorLogging } from '../../hooks';
import { ExpandIcon } from './components';
import './DiscountForm.css';

const DiscountForm = () => {
  const { data, applyDiscount } = useDiscount();
  const {
    discountApplied,
    discountCode,
  } = data;

  return (
    <MemoizedDiscountForm 
      discountCode={discountCode}
      discountApplied={discountApplied}
      applyDiscount={applyDiscount}
    />
  );
};

const MemoizedDiscountForm = memo(({
  discountCode,
  discountApplied,
  applyDiscount,
}) => {
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const [discount, setDiscount] = useState(discountCode);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(discountApplied ? false : true);

  const handleApply = useCallback(async () => {
    setLoading(true);
    try {
      await applyDiscount(discount);
      trackEvent('apply_discount_code');
      setErrors(null);
    } catch(e) {
      logError('discount_code', e);
      if (e.body.errors[0].type !== 'authorization.expired_jwt') {
        setErrors(e.body.errors);
      }
    }
    setLoading(false);
  }, [discount, applyDiscount, logError, trackEvent]);

  if (collapsed) {
    return (
      <div className="SummaryBlock Summary__DiscountForm">
        <div className="DiscountForm">
          <button className="DiscountForm__ExpandButton" onClick={() => setCollapsed(false)}>
            <ExpandIcon />
            <span className="ExpandButton__Text">Discount code</span>
          </button>
        </div>
      </div>
    );
  }

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
          onClick={handleApply}
          loading={loading}
        >
          Apply
        </Button>
      </div>
    </div>
  );
});

export default DiscountForm;
