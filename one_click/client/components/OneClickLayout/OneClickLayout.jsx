import React, { useState } from 'react';
import { MemoryRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { CheckoutForm } from './components/CheckoutForm';
import { PaymentMethod } from './components/Payment';
import { LayoutContext } from './context/LayoutContext';
import { Message} from '@boldcommerce/stacks-ui';
import { ProcessingOrder } from '../OneClickLayout/components/Processing'
import './OneClickLayout.css';

const OneClickLayout = ({ orderStatus, orderErrors }) => {
  const isProcessing = orderStatus === 'processing';
  const [openModal, setOpenModal] = useState(true);

  const CheckoutFormContainer = (
    <>
      <Router>
        <CheckoutForm />
        <Route path="/" component={PaymentMethod} /> {/* always toggle off when entering index or when entering not index?? */}
      </Router>
    </>
  );

  return (
    <LayoutContext.Provider value={{openModal, setOpenModal}}>
      {
        (isProcessing && <ProcessingOrder />) || (
          <>
            <div className="Checkout__Main">
              {
                orderErrors['order'] &&
                <Message type="alert">
                  An error with your order has occured, please try again
                </Message>
              }
              {
                CheckoutFormContainer
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
