import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router } from "react-router-dom";
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { CheckoutForm } from './components/CheckoutForm';
import { LayoutContext } from './context/LayoutContext';
import { Message} from '@boldcommerce/stacks-ui';
import './OneClickLayout.css';

const OneClickLayout = ({ orderStatus, orderErrors }) => {
  const [openModal, setOpenModal] = useState(true);

  return (
    <LayoutContext.Provider value={{openModal, setOpenModal}}>
      <div className="Checkout__Main">
        { orderErrors['order'] &&
          <Message type="alert">
            An error with your order has occured, please try again
          </Message>
        }
        <Router>
          <CheckoutForm />
        </Router>
      </div>
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
