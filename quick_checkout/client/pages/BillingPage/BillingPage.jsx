import React from 'react';
import { Billing, Customer, Shipping } from '../../components';

const BillingPage = () => {
  return (
    <>
      <Customer condensed />
      <Shipping condensed />
      <Billing />
    </>
  );
};

export default BillingPage;
