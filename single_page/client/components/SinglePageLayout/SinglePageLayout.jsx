import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  OrderProcessing, OrderProcessed, Customer, ShippingAddress, BillingAddress, ShippingLines, PaymentMethod, Summary, CheckoutButton, useCheckoutStore
} from '@boldcommerce/checkout-react-components';
import './SinglePageLayout.css';

const SinglePageLayout = ({ orderStatus }) => {
  const isProcessing = orderStatus === 'processing';
  const processed = orderStatus === 'completed';
  const [open, setOpen] = useState(false);

  const CheckoutForm = (
    <>
      <Customer />
      <ShippingAddress />
      <BillingAddress />
      <ShippingLines />
      <PaymentMethod />
      <CheckoutButton />
    </>
  );

  return (
    <>
      {
        (isProcessing && <OrderProcessing />) || (
          <>
            <div className="Checkout__Main">
              {
                processed ? <OrderProcessed /> : CheckoutForm
              }
            </div>
            <div className="Checkout__Summary">
              <Summary open={open} setOpen={setOpen} />
            </div>
          </>
        )
      }
    </>
  );
};

SinglePageLayout.propTypes = {
  orderStatus: PropTypes.string,
};

const MemoizedSinglePage = React.memo(SinglePageLayout);

const SinglePageContainer = () => {
  const { state } = useCheckoutStore();
  const { orderStatus } = state.orderInfo;

  return <MemoizedSinglePage orderStatus={orderStatus} />;
};

export default SinglePageContainer;
