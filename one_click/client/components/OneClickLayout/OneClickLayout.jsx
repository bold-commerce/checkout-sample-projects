import React from 'react';
import { MemoryRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { IndexPage } from './components/Index';
import { CheckoutForm } from './components/CheckoutForm';
import './OneClickLayout.css';

const OneClickLayout = ({ orderStatus }) => {
  const isProcessing = orderStatus === 'processing';
  const processed = orderStatus === 'completed';

  const CheckoutFormContainer = (
    <>
      <Router>
        <Route exact path="/" component={IndexPage} />
        <CheckoutForm />
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
                processed ? <OrderProcessed /> : CheckoutFormContainer
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

const MemoizedOneClickLayout = React.memo(OneClickLayout);

const OneClickContainer = () => {
  const { state } = useCheckoutStore();
  const { orderStatus } = state.orderInfo;

  return <MemoizedOneClickLayout orderStatus={orderStatus} />;
};

export default OneClickContainer;
