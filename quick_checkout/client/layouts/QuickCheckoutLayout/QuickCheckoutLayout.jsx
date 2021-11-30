import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { Header } from '../../components';
import { ContactPage, ShippingPage, BillingPage, ProcessingPage, ConfirmationPage, InventoryIssuesPage } from '../../pages';
import './QuickCheckoutLayout.scss';

const QuickCheckoutLayout = () => {
  const handleClose = () => {
    // TODO: Add code to close modal based on your implementation
    console.log('close modal');
  };

  return (
    <div className="Checkout">
      <Header shopName="Shop Name" onClose={handleClose} />
      <Routes>
        <Route path="/" element={<ContactPage />}/>
        <Route path="/shipping" element={<ShippingPage />}/>
        <Route path="/billing" element={<BillingPage />}/>
        <Route path="/processing" element={<ProcessingPage />}/>
        <Route path="/confirmation" element={<ConfirmationPage />}/>
        <Route path="/inventory_issues" element={<InventoryIssuesPage />} />
      </Routes>
    </div>
  )
};

export default QuickCheckoutLayout;
