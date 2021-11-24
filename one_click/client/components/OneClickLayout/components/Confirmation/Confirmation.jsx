import React, { useEffect } from 'react';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { Button } from '@boldcommerce/stacks-ui';
import { Link } from 'react-router-dom';
import { useAnalytics } from '../../../../hooks';
import './Confirmation.css'

const Confirmation = () => {
  const { state } = useCheckoutStore();
  const info = state.applicationState;
  const trackEvent = useAnalytics();

  useEffect(() => {
    trackEvent('thank_you');
  }, []);

  return(
    <div className='ConfirmationPage'>
      <h1>Thank you{ info.customer.first_name && ', ' + info.customer.first_name }!</h1>
      <div className='confirmation-order'>
        <h2>Your order is confirmed</h2>
        <div className='confirmation-order-accepted'>We've accepted your order, and we're getting it ready. A confirmation email has been sent to your email address.</div>
      </div>
      <div className='confirmation-information'>
        <h2>Customer information</h2>
        <h3>Shipping addrees</h3>
        <p>{info.addresses.shipping.first_name} {info.addresses.shipping.last_name}</p>
        <p>{info.addresses.shipping.address_line_1}</p>
        {
          info.addresses.shipping.address_line_2 &&
          <p>{info.addresses.shipping.address_line_2}</p>
        }
        <p>{info.addresses.shipping.city} {info.addresses.shipping.province_code} {info.addresses.shipping.postal_code}</p>
        <p>{info.addresses.shipping.country}</p>
        <h3>Billing address</h3>
        <p>{info.addresses.billing.first_name} {info.addresses.billing.last_name}</p>
        <p>{info.addresses.billing.address_line_1}</p>
        {
          info.addresses.billing.address_line_2 &&
          <p>{info.addresses.billing.address_line_2}</p>
        }
        <p>{info.addresses.billing.city} {info.addresses.billing.province_code} {info.addresses.billing.postal_code}</p>
        <p>{info.addresses.billing.country}</p>
        <h3>Shipping method</h3>
        {
          info.shipping.selected_shipping &&
          <p>{info.shipping.selected_shipping.description}</p>
        }
        <h3>Payment method</h3>
        {
          info.payments &&
          info.payments.map( (payment) => {
            return <p key={payment.id} >{payment.brand}</p>
          })
        }
      </div>
      <div className='confirmation-help'>
          <p>Need help? <a href='#'>Contact us</a></p> { /* TODO: get correct contact us link */}
      </div>
      <Link to='/'><Button className='confirmation-continue'>Continue shopping</Button></Link>
    </div>
  );
};

export default Confirmation;