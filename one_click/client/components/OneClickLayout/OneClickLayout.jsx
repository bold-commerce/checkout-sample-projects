import React from 'react';
import { MemoryRouter as Router, Route } from "react-router-dom";
import IndexPage from './components/Index';
import PropTypes from 'prop-types';
import {
  OrderProcessing, OrderProcessed, ShippingAddress, BillingAddress, useCheckoutStore
} from '@boldcommerce/checkout-react-components';
import './OneClickLayout.css';

const OneClickLayout = ({ orderStatus }) => {
  const isProcessing = orderStatus === 'processing';
  const processed = orderStatus === 'completed';

  const CheckoutForm = (
    <>
      <Router>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/shipping" component={ShippingAddress} />
        <Route exact path="/billing" component={BillingAddress} />
      </Router>
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
          </>
        )
      }
    </>
  );
};

OneClickLayout.propTypes = {
  orderStatus: PropTypes.string,
};

const MemoizedSinglePage = React.memo(OneClickLayout);

const OneClickContainer = () => {
  const { state } = useCheckoutStore();
  const { orderStatus } = state.orderInfo;

  return <MemoizedSinglePage orderStatus={orderStatus} />;
};

export default OneClickContainer;
