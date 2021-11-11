import { useDiscount } from '@boldcommerce/checkout-react-components';
import { Button, InputField } from '@boldcommerce/stacks-ui';
import React, { memo, useCallback, useState } from 'react';
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
  const [discount, setDiscount] = useState(discountCode);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApply = useCallback(async () => {
    setLoading(true);
    try {
      await applyDiscount(discount);
      setErrors(null);
    } catch(e) {
      setErrors(e.body.errors);
    }
    setLoading(false);
  }, [discount, applyDiscount]);

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
