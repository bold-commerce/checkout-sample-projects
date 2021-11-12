import React from 'react';
import PropTypes from 'prop-types';
import EmptyState from '../EmptyState/EmptyState';
import { BackButton } from '../BackButton';
import { usePaymentMethod } from '@boldcommerce/checkout-react-components';
import { BillingAddress } from '../BillingAddress';
import { Discount } from '../Discount';
import PaymentIframe from './PaymentIframe';
import './Payment.css';

export const PaymentMethod = ({ showPaymentMethod }) => {
  if (showPaymentMethod) {
    return (
      <div className="Payment">
        <h1 className="Section__Title">Payment</h1>
        <BackButton />
        <section className="FieldSet FieldSet--PaymentMethod">
          <div className="FieldSet__Content">
            <EmptyState title="To view payment options, complete filling in your address" />
            <PaymentIframe key="paymentIframe" hide />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="Payment">
      <h1 className="Section__Title">Payment</h1>
      <BackButton />
      <section className="FieldSet FieldSet--PaymentMethod">
        <div className="FieldSet__Content">
          <PaymentIframe key="paymentIframe" />
        </div>
        <div className="FieldSet__Content">
          <Discount />
        </div>
        <div className="FieldSet__Content">
          <BillingAddress />
        </div>
      </section>
    </div>
  );
};

PaymentMethod.propTypes = {
  showPaymentMethod: PropTypes.bool,
};

const MemoizedPaymentMethod = React.memo(PaymentMethod);

const PaymentMethodContainer = () => {
  const { showPaymentMethod } = usePaymentMethod();

  return <MemoizedPaymentMethod showPaymentMethod={showPaymentMethod} />;
};

export default PaymentMethodContainer;
