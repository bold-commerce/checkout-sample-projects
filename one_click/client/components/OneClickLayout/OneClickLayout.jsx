import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router } from "react-router-dom";
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { CheckoutForm } from './components/CheckoutForm';
import { LayoutContext } from './context/LayoutContext';
import { Message} from '@boldcommerce/stacks-ui';
import { useTranslation } from 'react-i18next';
import './OneClickLayout.css';

const OneClickLayout = ({ orderErrors }) => {
  const { t } = useTranslation(); 
  const [openModal, setOpenModal] = useState(true);

  return (
    <LayoutContext.Provider value={{openModal, setOpenModal}}>
      <div className="Checkout__Main">
        {
          orderErrors['order'] &&
          <Message type="alert">
            {t('error.order')}
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
