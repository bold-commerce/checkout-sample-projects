import React, { useState } from 'react';
import { MemoryRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { IndexPage } from './components/Index';
import { CheckoutForm } from './components/CheckoutForm';
import { PaymentMethod } from './components/Payment';
import { LayoutContext } from './context/LayoutContext';
import { CheckoutButton } from './components/CheckoutButton';
import { Message} from '@boldcommerce/stacks-ui';
import './OneClickLayout.css';

const OneClickLayout = ({ orderStatus, orderErrors }) => {
  const isProcessing = orderStatus === 'processing';
  const processed = orderStatus === 'completed';
  const [openModal, setOpenModal] = useState(true);


  const CheckoutFormContainer = (
    <>
      <Router>
        <Route exact path="/" component={IndexPage} />
        <Route path="/" component={PaymentMethod} />
        <CheckoutForm />
        <CheckoutButton className={"CheckoutButton"}/>
      </Router>
    </>
  );

  return (
    <LayoutContext.Provider value={{openModal, setOpenModal}}>
      {
        (isProcessing && <OrderProcessing />) || (
          <>
            <div className="Checkout__Main">
              {
                orderErrors['order'] &&
                <Message type="alert">
                  An error with your order has occured, please try again
                </Message>
              }
              {
                processed ? <OrderProcessed /> : CheckoutFormContainer
              }
            </div>
          </>
        )
      }
    </LayoutContext.Provider>
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
