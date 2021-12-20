import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { IndexPage } from '../../pages/IndexPage';
import { ProcessingPage } from '../../pages/ProcessingPage';
import { ConfirmationPage } from '../../pages/ConfirmationPage';
import './SinglePageLayout.css';
import { InventoryIssuesPage } from '../../pages/InventoryIssuesPage';

const SinglePageLayout = () => {
  const { state } = useCheckoutStore();
  const navigate = useNavigate();
  const orderStatus = state.orderInfo.orderStatus;

  useEffect(() => {
    if (orderStatus === 'error') {
      navigate('/');
    } else if (orderStatus === 'processing') {
      navigate('/processing');
    } else if (orderStatus === 'completed') {
      navigate(`/${process.env.CONFIRMATION_URL}?public_order_id=${state.publicOrderId}`);
    }
  }, [orderStatus]);

  return (
    <div className="Checkout">
      <Routes>
        <Route path="/" element={<IndexPage />}/>
        <Route path="/processing" element={<ProcessingPage />}/>
        <Route path="/confirmation" element={<ConfirmationPage />}/>
        <Route path="/inventory_issues" element={<InventoryIssuesPage />} />
      </Routes>
    </div>
  );
};

export default SinglePageLayout;