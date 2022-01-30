import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { useInventory } from '../../hooks';
import { IndexPage } from '../../pages/IndexPage';
import { ProcessingPage } from '../../pages/ProcessingPage';
import { ConfirmationPage } from '../../pages/ConfirmationPage';
import './SinglePageLayout.css';
import { InventoryIssuesPage } from '../../pages/InventoryIssuesPage';
import { useCallback } from 'react/cjs/react.development';

const SinglePageLayout = () => {
  const { state } = useCheckoutStore();
  const navigate = useNavigate();
  const validateInventory = useInventory();
  const orderStatus = state.orderInfo.orderStatus;

  const checkInventory = useCallback(async() => {
    const inventory_issues = await validateInventory(state.applicationState.line_items);

    if (inventory_issues) {
      navigate('/inventory_issues', { state: inventory_issues })
    }
  }, []);

  useEffect(() => {
    checkInventory();
  }, [])

  useEffect(() => {
    if (orderStatus === 'error') {
      navigate('/');
    } else if (orderStatus === 'processing') {
      navigate('/processing');
    } else if (orderStatus === 'completed') {
      navigate(`/confirmation?public_order_id=${state.publicOrderId}`);
    }
  }, [orderStatus]);

  return (
    <div className="Checkout">
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/inventory_issues" element={<InventoryIssuesPage />} />
      </Routes>
    </div>
  );
};

export default SinglePageLayout;