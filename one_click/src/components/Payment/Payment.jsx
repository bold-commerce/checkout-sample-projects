import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import EmptyState from '../EmptyState/EmptyState';
import PaymentIframe from './PaymentIframe';
import { Discount } from '../Discount';
import { useLocation } from 'react-router-dom';
import { BillingAddress } from '../BillingAddress';
import { useBillingAddress, useShippingLines } from '@boldcommerce/checkout-react-components';
import './Payment.css';
import { useTranslation } from 'react-i18next';

const PaymentMethod = ({ billingAddress, shippingLines }) => {
  const location = useLocation();
  const hidePaymentComponent = !(location.pathname === "/");
  const disabled = Array.isArray(billingAddress) && shippingLines.length === 0;
  const { t } = useTranslation();

  if (disabled) {
    return (
      <div className='Payment'>
        <section className={classnames(
          {'hidden': hidePaymentComponent ,
          'FieldSet FieldSet--PaymentMethod': true
        })}>
          <div className="FieldSet__Content">
            <EmptyState title={t('payment.empty')} />
            <PaymentIframe key="paymentIframe" hide />
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className='Payment'>
        <section className={classnames(
          {'hidden': hidePaymentComponent,
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
    </>
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
