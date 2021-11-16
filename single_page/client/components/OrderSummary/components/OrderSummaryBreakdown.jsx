import { useBreakdown, useDiscount } from '@boldcommerce/checkout-react-components';
import React, { memo, useCallback } from 'react';
import OrderSummaryItem from './OrderSummaryItem';

const OrderSummaryBreakdown = () => {
  const { data } = useBreakdown();
  const { data: { discountTotal, discountCode }, removeDiscount } = useDiscount();
  const {
    subTotal,
    shippingTotal,
    taxesTotal,
    total,
  } = data;

  return (
    <MemoizedOrderSummaryBreakdown
      subTotal={subTotal}
      shippingTotal={shippingTotal}
      taxesTotal={taxesTotal}
      total={total}
      discountTotal={discountTotal}
      discountCode={discountCode}
      onRemoveDiscount={removeDiscount}
    />
  );
};

const MemoizedOrderSummaryBreakdown = memo(({
  subTotal,
  shippingTotal,
  taxesTotal,
  total,
  discountTotal,
  discountCode,
  onRemoveDiscount,
}) => {
  const handleRemoveDiscount = useCallback(async () => {
    try {
      await onRemoveDiscount(discountCode);
    } catch(e) {
      console.log(e);
    }
  }, [discountCode]);

  return (
    <div className="OrderSummary__Breakdown">
      <div className="Breakdown__Section">
        <OrderSummaryItem
          title="Subtotal"
          amount={subTotal}
        />
        <OrderSummaryItem
          title="Discount"
          amount={-discountTotal}
          description={`Discount code: ${discountCode}`}
          onRemove={handleRemoveDiscount}
        />
        <OrderSummaryItem
          title="Shipping"
          amount={shippingTotal}
        />
        <OrderSummaryItem
          title="Taxes"
          amount={taxesTotal}
        />
      </div>
      <div className="Breakdown__Section Breakdown__Section--Total">
        <OrderSummaryItem
          title="Total"
          amount={total}
        />
      </div>
    </div>
  )
});

export default OrderSummaryBreakdown;