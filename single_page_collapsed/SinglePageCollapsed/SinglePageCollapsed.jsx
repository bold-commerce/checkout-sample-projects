import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  OrderProcessing, OrderProcessed, Customer, ShippingAddress, BillingAddress, ShippingLines, PaymentMethod, SummaryCollapsed, Branding, CheckoutButton, useCheckoutStore
} from '@boldcommerce/checkout-react-components';
import './SinglePageCollapsed.css';

const SinglePageCollapsed = ({ orderStatus }) => {
  const [open, setOpen] = useState(false);

  const isProcessing = orderStatus === 'processing';
  const processed = orderStatus === 'completed';

  const CheckoutForm = (
    <>
      <Branding brandName="Shop Name" />
      <Customer />
      <ShippingAddress />
      <BillingAddress />
      <ShippingLines />
      <PaymentMethod />
      <CheckoutButton />
    </>
  );

  return (
    <div className="Checkout--Collapsed">
      {
        (isProcessing && <OrderProcessing />)
      }
      {
        (
          <>
            <div className={`Checkout__Main ${open ? 'Checkout__Main--Overlay' : ''} ${isProcessing ? 'Checkout__Main--Hidden' : ''}`}>
              {
                processed ? <OrderProcessed /> : CheckoutForm
              }
            </div>
            <div className={`
            ${open ? 'Checkout__Summary' : 'Checkout__Summary Checkout__Summary--Collapsed'}
            ${isProcessing ? 'Checkout__Summary--Hidden' : ''}
            `}
            >
              <SummaryCollapsed open={open} setOpen={setOpen} />
            </div>
          </>
        )
      }
    </div>
  );
};

SinglePageCollapsed.propTypes = {
  orderStatus: PropTypes.string,
};

const MemoizedSinglePageCollapsed = React.memo(SinglePageCollapsed);

const SinglePageCollapsedContainer = () => {
  const { state } = useCheckoutStore();
  const { orderStatus } = state.orderInfo;

  return <MemoizedSinglePageCollapsed orderStatus={orderStatus} />;
};

export default SinglePageCollapsedContainer;
