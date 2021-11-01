import React from 'react';
import { MemoryRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import IndexPage from './components/Index';
import CheckoutForm from './components/CheckoutForm';
import './OneClickLayout.css';
import Message from '@boldcommerce/stacks-ui/lib/components/message/Message';

const OneClickLayout = ({ orderStatus, orderErrors }) => {
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
                Object.keys(orderErrors).some((errorKey) => orderErrors[errorKey] !== null) && 
               <Message type="alert">An error with your order has occured, please try again</Message>
              }
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
  const orderErrors  = state.errors;

  return <MemoizedOneClickLayout orderState={orderStatus} orderErrors={orderErrors} />;
};

export default OneClickContainer;
