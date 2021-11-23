import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EmptyState from '../EmptyState/EmptyState';
import { useLocation } from 'react-router-dom';
import { useBillingAddress, useShippingLines } from '@boldcommerce/checkout-react-components';
import { BillingAddress } from '../BillingAddress';
import { Discount } from '../Discount';
import PaymentIframe from './PaymentIframe';
import { LayoutContext } from '../../context/LayoutContext';

import classnames from 'classnames';
import './Payment.css';

const PaymentMethod = ({ billingAddress, shippingLines }) => {
  const location = useLocation();
  const hidePaymentComponent = !(location.pathname === "/");
  const { openModal } = useContext(LayoutContext);
  const disabled = !Array.isArray(billingAddress) && shippingLines.length !== 0;

  if (disabled) {
    return (
      <div className='Payment'>
        <section className={classnames(
          {'hidden': hidePaymentComponent || !openModal,
          'FieldSet FieldSet--PaymentMethod': true
        })}>
          <div className="FieldSet__Content">
            <EmptyState title="To view payment options, complete filling in your address" />
            <PaymentIframe key="paymentIframe" hide />
          </div>
        </section>
      </div>
    );
  }

  return (
      <div className='Payment'>
        <section className={classnames(
          {'hidden': hidePaymentComponent || !openModal,
          'FieldSet FieldSet--PaymentMethod': true
        })}>
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
  const { data: billingAddress } = useBillingAddress();
  const { data } = useShippingLines(); 
  const { shippingLines } = data;

  return <MemoizedPaymentMethod shippingLines={shippingLines} billingAddress={billingAddress} />;
};

export default PaymentMethodContainer;
